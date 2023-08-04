import { razorpay } from '../app.js';
import Payment from '../models/payment.model.js';
import User from '../models/user.model.js';
import AppError from '../utils/appError.js';

export const getRazorPayApiKey = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      msg: 'Razorpay API Key',
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user)
      return next(new AppError('Unauthorized access, Please login', 500));
    if (user.role === 'ADMIN') {
      return next(new AppError('Admin cannot buy subscription', 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();
    res.status(200).json({
      success: true,
      msg: 'Subscribed successfully',
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError('Unauthorized access, Please login', 500));
    }

    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    const generatedSignature = crypto
      .createHmac('sha256', process.RAZORPAY_SECRET)
      .update(`${(razorpay_payment_id, razorpay_subscription_id)}`);

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError('payment not verified, try again', 500));
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    (user.subscription.status = 'active'), await user.save();
    return res.status(200).json({
      success: true,
      msg: 'Payment verified successfully',
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError('Unauthorized access, Please login', 500));
    }

    if (user.role === 'ADMIN') {
      return next(new AppError('Admin cannot cancel the subscription', 403));
    }

    const subscriptionId = user.subscription.id;
    const subscription = await razorpay.subscriptions.cancel({
      subscriptionId,
    });

    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
      success: true,
      msg: 'Subscription cancelled successfully',
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const count = req.query;
    const subscriptions = await razorpay.subscriptions.all({
      count: count || 10,
    });

    return res.status(200).json({
      success: true,
      msg: 'All payments',
      payments: subscriptions,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
