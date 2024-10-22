import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import JobList from './components/jobs/JobList';
import JobForm from './components/jobs/JobForm';
import JobDetails from './components/jobs/JobDetails';
import ApplicationForm from './components/applications/ApplicationForm';
import TestimonialForm from './components/testimonials/TestimonialForm';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/jobs" component={JobList} />
            <PrivateRoute exact path="/jobs/new" component={JobForm} />
            <Route exact path="/jobs/:id" component={JobDetails} />
            <PrivateRoute exact path="/apply/:jobId" component={ApplicationForm} />
            <PrivateRoute exact path="/testimonial" component={TestimonialForm} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/admin" component={AdminDashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;