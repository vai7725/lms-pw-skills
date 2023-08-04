import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      console.log('DB connection established successfully');
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connect;
