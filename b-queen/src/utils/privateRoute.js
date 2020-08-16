import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import store from '../store';

const PrivateRoute = props => 1 > 0 > 0 ? <Route {...props} /> : <Redirect to='/login'/>

export default PrivateRoute;

//useSelector(state => state.userLogged)