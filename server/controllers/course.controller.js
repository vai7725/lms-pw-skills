import cloudinary from 'cloudinary';
import fs from 'fs';

import AppError from '../utils/appError.js';
import Course from '../models/course.model.js';

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select('-lectures');
    res.status(200).json({
      success: true,
      msg: 'All Courses',
      courses,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError('Invalid course ID', 400));
    }

    res.status(200).json({
      success: true,
      msg: 'Course lectures fetched successfully',
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;
    if (!title || !description || !category || !createdBy) {
      return next(new AppError('All fields are required', 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: 'Dummy data',
        secure_url: 'Dummy data',
      },
    });
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms',
      });
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.promises.rm(`uploads/${req.file.filename}`);

      await course.save();

      res
        .status(200)
        .json({ success: true, msg: 'Course created successfully.' });
    }
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    console.log(req.params);
    console.log(req.body);
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new AppError('Course doesn not exist', 400));
    }

    res
      .status(200)
      .json({ success: true, msg: 'Course updated successfully.' });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return new AppError(`No course found with the id ${courseId}`, 400);
    }

    await Course.findByIdAndDelete(courseId);
    res
      .status(200)
      .json({ success: true, msg: 'Course deleted successfully.' });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const addLectureToCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { courseId } = req.params;
    if (!title || !description) {
      return next(new AppError('All fields are required', 500));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new AppError(`No course found with the id ${courseId}`, 400));
    }

    const lectureData = { title, description, lecture: {} };
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms',
      });
      if (result) {
        lectureData.lecture.public_id = result.public_id;
        lectureData.lecture.secure_url = result.secure_url;
      }
      fs.promises.rm(`uploads/${req.file.filename}`);
    }

    course.lectures.push(lectureData);
    course.numberOfLectures = course.lectures.length;

    await course.save();
    res.status(200).json({
      success: true,
      msg: 'Lecture added successfully',
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
