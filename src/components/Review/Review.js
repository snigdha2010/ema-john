import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import CartReview from '../CartReview/CartReview';
import Cart from '../Cart/Cart';
import gify from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
   
const Review = () => {
    const[item,setItem] = useState([])
    const [orderPlace,setOrderPlace] = useState(false)
    const history = useHistory();
    useEffect(() => {
     const database = getDatabaseCart()
      const keys = Object.keys(database)
      console.log(keys)
      
      fetch('https://lit-brushlands-59071.herokuapp.com/getProductsByKeys',{
        method:'POST',
        headers:{
        "Content-type": "application/json"
        },
        body: JSON.stringify(keys)
      })
      .then(res=> res.json())
      .then(data => {
          setItem(data)
      })
    
    },[])
   
    const handleRemove = (key) =>{
        removeFromDatabaseCart(key)
        const other = item.filter(pd =>pd.key !== key)
        setItem(other)
    }
    
    const handlePrpceedCheckout = () =>{
        setOrderPlace(true)
        setItem([])
        history.push('/shipment')
    }
     
    return (
        <div className='shop-container'>
            <div className='product-container'>
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
                    onClick={handlePrpceedCheckout}
                    className='main-button'>Proceed Checkout</button>
                </Cart>}
            </div>

            
        </div>
    );
};

export default Review;