import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import store from '../store';

const PrivateRoute = props => useSelector(state => state.userLogged) > 0 ? <Route {...props} /> : <Redirect to='/login'/>

export default PrivateRoute;

//useSelector(state => state.userLogged)