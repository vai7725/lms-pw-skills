import cloudinary from 'cloudinary';
import fs from 'fs';
import crypto from 'crypto';

import User from '../models/user.model.js';
import AppError from '../utils/appError.js';
import { sendEmail } from '../utils/sendEmail.js';

const cookieOptions = {
  secure: true,
  maxAge: 24 * 60 * 60 * 60 * 1000,
};

export const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  if ((!fullName, !email, !password))
    return next(new AppError('Please provide proper credentials', 400));

  const userExists = await User.findOne({ email });

  if (userExists) return next(new AppError('Email already exist', 400));

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url: 'https://avatars.githubusercontent.com/u/107029078?v=4',
    },
  });
  if (!user) return next(new AppError('User registration failed', 500));

  // TODO: upload user picture.

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms',
        width: 250,
        height: 250,
        gravity: 'faces',
        crop: 'fill',
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // removing file from local server
        await fs.promises.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      next(new AppError(error.message || 'File not uploaded, try again.'));
    }
  }
  await user.save();

  const token = await user.generateToken();
  res.cookie('token', token, cookieOptions);
  user.password = undefined;

  user.password = undefined;
  return res.status(200).json({
    success: true,
    message: 'User registered successfully',
    user,
  });
};

export const login = async () => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Please provide proper credentials', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.comparePassword(password)) {
    return next(new AppError('No user found with this email', 400));
  }

  const token = await user.generateToken();
  user.password = undefined;

  res.cookie('token', token, cookieOptions);
  return res.status(201).json({
    success: true,
    message: `Log in successfull`,
  });
};

export const logout = (req, res) => {
  res.cookie('token', null, { secure: true, httpOnly: true });
  return res.status(200).json({
    success: true,
    message: "You've been logged out successfully.",
  });
};

export const getProfile = (req, res) => {
  try {
    const user = User.findById(req.user.id);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new AppError('Could not get user profile', 500));
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  console.log(req.body);
  if (!email) return next(new AppError('Email is required', 400));

  const user = await User.findOne({ email });
  if (!user) return next(new AppError('Email is not registered', 400));

  const resetToken = await user.generateResetPasswordToken();
  await user.save();

  const resetPasswordUrl = `${process.env.CLIENT_URI}/reset-password/${resetToken}`;
  const subject = 'Reset Password';
  const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target='_blank'>Reset your password </a>`;

  console.log(resetPasswordUrl);
  try {
    await sendEmail(email, subject, message);
    res.status(200).json({
      success: true,
      msg: `Reset password token has been sent to ${email} successfully.`,
    });
  } catch (error) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();
    return next(new AppError(error.message, 500));
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const forgotPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError('Token is invalid or expired, please try again', 400)
    );
  }

  user.password = password;
  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;

  await user.save();
  res.status(200).json({
    success: true,
    msg: 'Password changed successfully',
  });
};

export const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  if (!oldPassword || !newPassword)
    return next(new AppError('All fields are mendatory', 400));

  const user = await User.findById(id).select('+password');
  if (!user) {
    return next(new AppError('User does not exist', 400));
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return next(new AppError('Invalid old password', 400));
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    msg: 'Password changed successfully.',
  });
};

export const updateUser = async (req, res, next) => {
  const { fullName } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError('User dows not exist', 400));
  }

  if (fullName) {
    user.fullName = fullName;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'lms',
      width: 250,
      height: 250,
      gravity: 'faces',
      crop: 'fill',
    });

    if (result) {
      user.avatar.public_id = result.public_id;
      user.avatar.secure_url = result.secure_url;

      // removing file from local server
      await fs.promises.rm(`uploads/${req.file.filename}`);
    }
  }

  await user.save();
  res.status(200).json({
    success: true,
    msg: 'User details updated successfully!',
  });
};
