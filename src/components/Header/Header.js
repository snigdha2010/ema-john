import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const {signedInUser, setSignedInUser, googleSignOut} = useContext(UserContext);
   
    return (
        <div className = 'header'>
               <img src={logo} alt=""/>
               <nav>
                   <Link className='a' to="/shop">Shop</Link>
                   <Link className='a' to="/review">Order Review</Link>
                   <Link className='a' to ='/shipment'>Shipment</Link>
                   <Link className='a' to="/inventory">Manage Inventory Here</Link>
                <button  onClick={googleSignOut}>Sign out</button>
               </nav>
        </div>
    );
};

export default Header;