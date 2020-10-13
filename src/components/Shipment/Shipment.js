import React, { useContext } from 'react';
import './Shipment.css';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const [signedInUser, setSignedInUser] = useContext(UserContext);
    const onSubmit = data => {
        const savedCart = getDatabaseCart();

        const orderDetails = { ...signedInUser, products: savedCart, shipment: data , orderTime : new Date() }
        console.log(orderDetails, savedCart)
        fetch('http://localhost:5000/addOrder',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data =>{
            console.log("mm",data)
            if(data){
            processOrder();
            alert('Your OrderSuccessful')
            }
        })

    }
  
    return (
        <div>
            This is Shipment!!
            <form onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={signedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}
            <br/>
            <input name="email" defaultValue={signedInUser.email} ref={register({ required: true })}  placeholder="Your Email"/>
            {errors.email && <span className="error">Email is required</span>}
            <br/>
            <input name="address" ref={register({ required: true })}  placeholder="Your Address" />
            {errors.address && <span className="error">Address is required</span>}
            <br/>
            <input name="phone" ref={register({ required: true })}  placeholder="Your Phone Number"/>
            {errors.phone && <span className="error">Phone Number is required</span>}
            
      <input type="submit" />
    </form>
        </div>
    );
};

export default Shipment;