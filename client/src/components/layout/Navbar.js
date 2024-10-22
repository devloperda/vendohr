import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import NotificationIcon from './NotificationIcon';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <NotificationIcon />
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      {user && user.role === 'admin' && (
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      )}
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> Venoda Service
        </Link>
      </h1>
      {!loading && (
        <React.Fragment>{isAuthenticated ? authLinks : guestLinks}</React.Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);<boltAction type="file" filePath="client/src/components/layout/NotificationIcon.js">
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getNotifications } from '../../actions/notifications';
import PropTypes from 'prop-types';

const NotificationIcon = ({ notifications, getNotifications }) => {
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-icon">
      <i className="fas fa-bell"></i>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  );
};

NotificationIcon.propTypes = {
  notifications: PropTypes.array.isRequired,
  getNotifications: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notifications: state.notifications
});

export default connect(mapStateToProps, { getNotifications })(NotificationIcon);