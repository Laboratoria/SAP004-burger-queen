import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { history } from '../../history';
import minilogocut from '../../img/mini-logo-cut.png';
import Button from '../Button';
import 'firebase/auth';
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../config/firebase';



function Header(props) {
    const dispatch = useDispatch();
    
    const LogOut = () => {
        dispatch({ type: 'LOG_OUT' })  

        firebase
            .auth()
            .signOut()
            .then(() => {
                history.push('/login')
            })
    
    };

    return (
        <div className="header-content d-flex justify-content-around" aria-label="Exemplo básico">
            <img src={minilogocut} className=' mini-logo img-responsive' alt='minilogo' />
            <Button
                type="button"
                className="btn btn-header"
                name={props.name1}
                handleClick= {props.butClick1}
            />
            <Button
                type="button"
                className="btn btn-header"
                name={props.name2}
                handleClick= {props.butClick2}
            />
            <Button
                type="button"
                className="btn btn-header"
                name='Sair ⇲'
                handleClick={LogOut}
            />
            <Link to='login'></Link>
        </div >
    )
}


export default Header;