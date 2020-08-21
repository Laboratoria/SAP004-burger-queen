import React, { useState, useEffect } from 'react';
import './items.css';
import Button from '../Button';

const Items = (props) => {
    return (

        <div className='item-content my-sm-3' data-key={props.key}>
            <div className='d-flex font-style-orange justify-content-between my-sm-2'>
                <span className="font-size">{props.name}</span>
                <span>R${props.price} </span>
            </div>

            <div className="container-options-price d-flex justify-content-between">
                {props.options ? (
                    <select className="options" value={props.selectValue} onChange={props.selectClick}>
                        <option value="selectedItem" selected disabled hidden>Selecione</option>
                        {props.options.map((option) => <option value={option}>{option}</option>)}
                    </select>
                ) : ''}

                <Button
                    name='Incluir'
                    className='btn btn-add-item btn-sm my-sm-2 ml-sm-3 flex-row-reverse'
                    handleClick={props.butClick}
                />
            </div>
        </div >
    )
};

export default Items;