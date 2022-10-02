import React from 'react';
import Product from '../Product/Product';
import './Cart.css'

const Cart = (props) => {
    const {cart} = props;
    let total = 0;
    let quantity = 0;
    let shipping = 0;
    let tax = 0;
    let grandTotal = 0;
    for(const product of cart){
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
        tax = parseFloat((total * 0.1).toFixed(2));
        grandTotal = total + shipping + tax;
    }
    return (
        <div className='cart'>
             <h1>Summary</h1>
            <p>Select Items: {quantity}</p>
            <p>Total Price: $ {total}</p>
            <p>Total Shipping: $ {shipping}</p>
            <p>Tax: {tax}</p>
            <h3>Gran Total : $ {grandTotal}</h3>
        </div>
    );
};

export default Cart;