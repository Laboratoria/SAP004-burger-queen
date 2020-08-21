import React from 'react';
import './item.css';
import Button from '../Button';



const ItemSummary = (props) => {
    return (

        <div className='item-summary-list w-100 my-sm-2 '>
            <div className='font-style text-center'>{props.item_name}</div>
            <div className='font-style text-center'>{props.setOptions}</div>
            

            <div className="quantity-and-price">
                <button className='btn-quantity' onClick={() => props.reduceItemSummary(props.itemId)}>-</button>
                <span className='counter'>{props.quantity}</span>
                <button className='btn-quantity' onClick={() => props.addItemSummary(props.itemId)}>+</button>
                <span className='font-style'> R${props.price} </span>
            </div>
            <Button
                name='excluir'
                className='deteleButton'
                handleClick={props.deleteClick}
            />
        </div>

    )
}

export default ItemSummary;