import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import job from './job';
import application from './application';
import testimonial from './testimonial';
import notification from './notification';
import admin from './admin';

export default combineReducers({
  alert,
  auth,
  profile,
  job,
  application,
  testimonial,
  notification,
  admin
});