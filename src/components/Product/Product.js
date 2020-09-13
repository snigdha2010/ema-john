import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const{name,img,seller,price,stock,key} = props.product;
 
    return (
        <div className='product'>
            <div>
                <img src={img}alt=""/>
            </div>
            <div className='product-details'>
        

                <Link to={`/product/${key}`}>
                    <h3>{name}</h3>
                </Link>
                <p>by {seller}</p>
                <p>${price}</p>
                <p>only {stock} left in stock - order soon</p>
                {
                 props.showButton === true && <button className="main-button" onClick={()=>props.handleAddCart(props.product)}>
                <FontAwesomeIcon icon={faShoppingCart}/> add to cart</button>
                }
                  </div>
        </div>
    );
};

export default Product;