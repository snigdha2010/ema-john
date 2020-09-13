import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ReviewItem = () => {
    const {id} = useParams();  
    const data = fakeData;
    const ItemDetail =  data.find((pd)=>{
       return id === pd.key;
    });

    return (
        <div>
           Product Details 
           {
               <Product 
                showButton={false}
                key={id} product = {ItemDetail}></Product>
           }
        </div>
    );
};

export default ReviewItem;