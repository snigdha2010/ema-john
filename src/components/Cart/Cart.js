import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for(let i = 0; i< cart.length; i++){
        const product = cart[i];
        console.log(product.price, product.quantity)
        total = total + product.price * product.quantity || 1;
    }
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    
    // const current = total.map(pr =>pr.price)
    // const quantity = total.map(pr =>pr.quantity)
    // let totalPrice= 0;
    // for (let i = 0; i < quantity.length; i++) {
    //     const element = quantity[i]
    //      totalPrice = current.reduce((acc, item) =>acc + (item *(element || 1)),0)
    // }

    return (
        <div>
            {/* Item Total: {total.length}
            <br/>
            Total Price: {totalPrice} 
            <br/>
            {props.children} */}
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shiiping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;