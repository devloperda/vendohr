import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_JOBS,
  GET_JOB,
  ADD_JOB,
  DELETE_JOB,
  JOB_ERROR
} from './types';

// Get jobs
export const getJobs = () => async dispatch => {
  try {
    const res = await axios.get('/api/jobs');

    dispatch({
      type: GET_JOBS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get job
export const getJob = id => async dispatch => {
  try {
    const res = await axios.get(`/api/jobs/${id}`);

    dispatch({
      type: GET_JOB,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add job
export const addJob = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/jobs', formData, config);

    dispatch({
      type: ADD_JOB,
      payload: res.data
    });

    dispatch(setAlert('Job Created', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete job
export const deleteJob = id => async dispatch => {
  try {
    await axios.delete(`/api/jobs/${id}`);

    dispatch({
      type: DELETE_JOB,
      payload: id
    });

    dispatch(setAlert('Job Removed', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};