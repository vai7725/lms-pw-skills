import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_subscription_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: String,
  },
});

const Payment = mongoose.model('payment', paymentSchema);

export default Payment;
