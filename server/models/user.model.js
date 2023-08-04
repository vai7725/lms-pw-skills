import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exist'],
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLengh: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription: {
      id: String,
      Status: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  comparePassword: function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  },

  generateToken: function () {
    return jwt.sign(
      {
        id: this._id,
        role: this.role,
        email: this.email,
        subscription: this.subscription,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
  },

  generateResetPasswordToken: async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

    return resetToken;
  },
};

const User = mongoose.model('user', userSchema);

export default User;
