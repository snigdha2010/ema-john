import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useEffect } from 'react';
import { useState } from 'react';

const ReviewItem = () => {
    const {id} = useParams();  
    const [ product , setProduct ] = useState({});
    useEffect(()=>{
       fetch('http://localhost:5000/product/'+id)
       .then(res => res.json())
       .then(data =>setProduct(data))
    },[id])
  

    return (
        <div>
           Product Details 
           {
               <Product 
                showButton={false}
                key={id} product = {product}></Product>
           }
        </div>
    );
};

export default ReviewItem;