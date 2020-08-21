import React from 'react';
import Button from '../Button';
import './style.css';

const Card = (props) => {

    let arrayRequests = [];
    for(let arrayItem of props.viewRequests){
        arrayRequests.push(
            {
                name: arrayItem.name,
                quantity: arrayItem.quantity,
                option: arrayItem.option
            }
        )
        
    }    


    return (

        <div className="basic-structure mx-auto text-center">
            <h4>Mesa {props.tableNumber}</h4>
            <h5>Cliente: {props.client}</h5>
            <h6>Atendente: {props.worker}</h6>

            <div className="view-orders mx-auto text-center">
            {arrayRequests.map(item => 
                <>
                    <p>{item.quantity} x {item.name}</p>
                    <p>{item.option}</p>
                    <hr/>
                </>
            )}
            </div>
            <h6>{props.time}</h6>
            <Button
                name={props.buttonTitle}
                type="button"
                className="btn btn-card"
                handleClick={props.sendClick}
            />
        </div>

    )

}

export default Card;