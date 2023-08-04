import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minLength: [8, 'Title must be at least 8 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minLength: [8, 'Description must be at least 8 characters'],
      trim: true,
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
    },

    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },

    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
            required: true,
          },
          secure_url: { type: String, required: true },
        },
      },
    ],

    numberOfLectures: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = new mongoose.model('course', courseSchema);

export default Course;
