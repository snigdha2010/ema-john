import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [signedInUser, setSignedInUser] = useContext(UserContext)
    return (
        <div className = 'header'>
               <img src={logo} alt=""/>
               <nav>
                   <Link className='a' to="/shop">Shop</Link>
                   <Link className='a' to="/review">Order Review</Link>
                   <Link className='a' to="/inventory">Manage Inventory Here</Link>
                <button  onClick={()=>setSignedInUser({})}>Sign out</button>
               </nav>
        </div>
    );
};

export default Header;