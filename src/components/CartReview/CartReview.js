import React from 'react';


const CartReview = (props) => {
    console.log(props.product)
    const{key,name,img,quantity,price} = props.product;
    
   

    return (
    <div className='product'>
            <div>
            <img src={img}alt=""/>
            </div>
        <div className='product-details'>
           <h2>{name}</h2>
           <p>Price: {price}</p>
           <p>Quantity:{quantity}</p>
           <button onClick={() =>props.handleRemove(key)} className='main-button'>Remove</button>
        </div>
    </div>
    );
};

export default CartReview;