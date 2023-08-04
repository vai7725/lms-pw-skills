import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';

export const isLoggedIn = (err, req, res, next) => {
  const { token } = req.cookie;
  if (!token) {
    return next(new AppError('Unauthenticated request, please login', 401));
  }

  const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
  if (!tokenDetails) {
    return next(new AppError('Unauthenticated request, please login', 401));
  }

  req.user = tokenDetails;
  next();
};

export const authorizedRoles =
  (...roles) =>
  (req, res, next) => {
    const currentRole = req.user.role;
    if (roles.includes(currentRole)) {
      return next(
        new AppError('You do not has permission to access this route', 403)
      );
    }
    next();
  };

export const authorizedSubscriber = async (req, res, next) => {
  const subscriptionStatus = req.user.subscription.status;
  const currentRole = req.user.role;
  if (currentRole !== 'ADMIN' && subscriptionStatus !== 'active') {
    return next(
      new AppError('Please subscribe to the course to access the lectures', 403)
    );
  }

  next();
};
