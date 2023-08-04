import { Router } from 'express';

import {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  deleteCourse,
  addLectureToCourse,
} from '../controllers/course.controller.js';
import {
  isLoggedIn,
  authorizedRoles,
  authorizedSubscriber,
} from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router
  .route('/')
  .get(getAllCourses)

  .post(
    isLoggedIn,
    upload.single('thumbnail'),
    authorizedRoles('ADMIN'),
    createCourse
  );

router
  .route('/:courseId')
  .get(isLoggedIn, authorizedSubscriber, getLecturesByCourseId)
  .post(upload.single('lecture'), addLectureToCourse)
  .put(isLoggedIn, authorizedRoles('ADMIN'), updateCourse)
  .delete(isLoggedIn, authorizedRoles('ADMIN'), deleteCourse);

export default router;
