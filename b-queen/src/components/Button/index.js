import React from 'react';
import './style.css';

const Button = (props) => {
    return (
        <button onClick={props.handleClick} className={['btn-style', props.className].join(' ')}>{props.name}{props.title}</button>
    )
};
export default Button;