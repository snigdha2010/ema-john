import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import CartReview from '../CartReview/CartReview';
import Cart from '../Cart/Cart';
import gify from '../../images/giphy.gif';
   
const Review = () => {
    const[item,setItem] = useState([])
    const [orderPlace,setOrderPlace] = useState(false)
    useEffect(() => {
     const database = getDatabaseCart()
     const keys = Object.keys(database)
    const count = keys.map(key =>{
        const product = fakeData.find(pd =>pd.key===key)
        product.quantity = database[key];
        return product
    }) ;
     setItem(count)
    },[])
   
    const handleRemove = (key) =>{
        removeFromDatabaseCart(key)
        const other = item.filter(pd =>pd.key !== key)
        setItem(other)
    }
    
    const handlePlaceOrder = () =>{
        setOrderPlace(true)
        setItem([])
        processOrder()
    }
     
    return (
        <div className='shop-container'>
            <div className='product-container'>
                Review here
            {orderPlace && <img style={{width:'100%'}} src={gify} alt="" />  }
            { 
            item.map(pd=><CartReview
            key= {pd.key}
             product = {pd}
            handleRemove = {handleRemove}
              >
              </CartReview>)
            
            } 
            </div>
            <div className='cart-container'>
                {<Cart cart={item}>
                    <button 
                    onClick={handlePlaceOrder}
                    className='main-button'>Place Order</button>
                </Cart>}
            </div>

            
        </div>
    );
};

export default Review;