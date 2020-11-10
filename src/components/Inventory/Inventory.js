import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProduct = ( ) =>{
        const product = {}
        fetch('https://lit-brushlands-59071.herokuapp.com/addProduct',{
            method:'POST',
            headers:{
            "Content-type": "application/json"
            },
            body: JSON.stringify(fakeData)
        })
    }
    return (
        <div className='text-center pt-5'>
            <form action='/addProduct' method="post">
              <p><span>Name:</span><input type="text" name="" id=""/></p>  
                <br/>
              <p><span>price:</span><input type="text" name="" id=""/></p> 
              <br/>
              <p><span>quantity:</span><input type="text" name="" id=""/></p> 
              <br/>
              <p><span>Image:</span><input type="file" name="" id=""/></p> 
              <br/>
            </form>
              <button onClick={ handleAddProduct} >Add Product</button>
        </div>
    );
};

export default Inventory;