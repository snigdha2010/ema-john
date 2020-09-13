import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
   
    
   const data = fakeData.slice(0,10);
   console.log(data)
   const [products, setProducts] = useState(data);
   const [cart,setCart] = useState([]);

   useEffect(() => {
    const currentData = getDatabaseCart();
   
    const productKeys = Object.keys(currentData)
    const values = productKeys.map(key =>{
        const product = fakeData.find(pd=>pd.key === key) 
        product.quantity = currentData[key];
        console.log(product)
        return product; 
    })
    setCart(values)
   },[])

   const handleAddCart = (product) =>{
       const toBeAddedKey = product.key;
       const sameProduct = cart.find(c => c.key === toBeAddedKey)
       let count = 1; let newCart;
       if(sameProduct){
           count = sameProduct.quantity + 1
           sameProduct.quantity = count;
           const other = cart.filter(c => c.key !== toBeAddedKey)
           newCart = [...other,sameProduct]
           
       } else {
           product.quantity = 1;
           newCart = [...cart,product]
       }
       addToDatabaseCart(product.key,count)
       setCart(newCart)

   }


    return (
      <div className='shop-container'>
        <div className='product-container' >
            {
             products.map(pd =>
            <Product showButton={true}
             key={pd.key} product={pd}
             handleAddCart = {handleAddCart}    
            ></Product>)
            }
        </div>
        <div className='cart-container'>
            {<Cart cart = {cart}>
               <Link to = '/review'>
               <button className='main-button'>Review Cart</button>
               </Link> 
                
                </Cart>}

        </div>
        </div>
    );
};

export default Shop;