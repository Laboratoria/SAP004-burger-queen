import React from 'react';
import './style.css';

const Input = (props) => {
    return (
        <div className="for-placeholder">
            <input
                input type={props.type}
                className={['form-control input-style form-control-lg my-1', props.className].join(' ')}

                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange} >
            </input >
        </div>
    )
};
export default Input;