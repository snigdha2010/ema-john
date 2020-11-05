import React, { useState, useEffect } from 'react';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
   
    document.title = "Shope"
  
   const [products, setProducts] = useState([]);
   const [cart,setCart] = useState([]);
   const [search, setSearch] = useState('');
    useEffect(()=>{
        fetch('https://lit-brushlands-59071.herokuapp.com/products?search='+search)
        .then(res => res.json())
        .then(data => setProducts(data))
    },[search])
    console.log(products)

   useEffect(() => {
    const currentData = getDatabaseCart();
    const productKeys = Object.keys(currentData)

    fetch('https://lit-brushlands-59071.herokuapp.com/getProductsByKeys',{
        method:'POST',
        headers:{
        "Content-type": "application/json"
        },
        body: JSON.stringify(productKeys)
      })
      .then(res=> res.json())
      .then(data => {
          setCart(data)
      })
      
    // if(products.length > 0){
    //      const values = productKeys.map(key =>{
    //     const product = products.find(pd=>pd.key === key) 
    //     product.quantity = currentData[key];
    //     console.log(product)
    //     return product; 
    // })
    // setCart(values)
    // }
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
   const handleSearch = (e)=>{
       setSearch(e.target.value)

   }


    return (
      <div className='shop-container'>
        <div className='product-container' >
            <input type="text" onBlur={handleSearch} className='product-search' placeholder='seach product'/>
            {products &&
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