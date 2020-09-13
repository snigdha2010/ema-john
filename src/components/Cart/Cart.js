import React from 'react';

const Cart = (props) => {
    const total = props.cart;
    
    const current = total.map(pr =>pr.price)
    const quantity = total.map(pr =>pr.quantity)
    let totalPrice= 0;
    for (let i = 0; i < quantity.length; i++) {
        const element = quantity[i]
         totalPrice = current.reduce((acc, item) =>acc + (item *element),0)
    }

    return (
        <div>
            Item Total: {total.length}
            <br/>
            Total Price: {totalPrice} 
            <br/>
            {props.children}
        </div>
    );
};

export default Cart;