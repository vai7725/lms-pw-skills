// packages
import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import cloudinary from 'cloudinary';
import bodyParser from 'body-parser';
import Razorpay from 'razorpay';

// modules
import userRoutes from './routes/user.route.js';
import courseRoutes from './routes/course.route.js';
import errorMiddleware from './middlewares/error.middleware.js';
import connect from './config/connectDB.js';
import paymentRoutes from './routes/payment.route.js';

// variables
const app = express();
const port = process.env.PORT || 3000;
const clientURI = process.env.CLIENT_URI;

// middlewares
config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: clientURI,
    credentials: true,
  })
);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.use(morgan('dev'));
app.use(cookieParser());
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Home route');
});

app.all('*', (req, res) => {
  res.status(404).json({ success: false, msg: 'OOPS! 404 page not found' });
});

const start = async () => {
  try {
    await connect();
    app.listen(port, () => console.log(`App listening at ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
