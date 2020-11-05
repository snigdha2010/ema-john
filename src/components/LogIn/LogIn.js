import React, { useState, useContext} from 'react';
import './LogIn.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { firebaseIntitalize, handleGoogleSignin, handleSignUp, handleSignIn, handleSignOut, handleFbSignIn } from './LoginManager';


firebaseIntitalize()
const LogIn = () => {
    const [singeupUser,setSingeupUser] = useState(true)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });
    const [signedInUser, setSignedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state ||  { from: { pathname: "/" } };
    
   
    const googleSignin = () =>{
        handleGoogleSignin()
        .then(res => {
            handleUpdate(res,true)
        })
    }
    const faceBookSignIn = () => {
        handleFbSignIn()
        .then(res =>{
            handleUpdate(res,true)
        })
    }
    const handleInputData = (e)=> {
        let isInputValid = true;
        if(e.target.name === 'email'){
          const value = e.target.value;
          isInputValid = /^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$/.test(value)
        
        }
        if(e.target.name === 'password'){
            const hasNumber = /\d{1}/.test(e.target.value)
            const lengthLimit = e.target.value.length > 5
            isInputValid = hasNumber && lengthLimit
  
        }
        if(isInputValid){
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)

        }
    }

    const handleSubmit = (e)=> {
        if(singeupUser&&user.email && user.password){
            handleSignUp(user.email,user.password,user.name)
            .then(res=>{
                handleUpdate(res,true)
            })
        }
        if(!singeupUser &&user.email && user.password){
            handleSignIn(user.email , user.password)
            .then(res=>{
                handleUpdate(res,true) 
            })
                 
        }
        e.preventDefault();
    }

 
    const signOut = () =>{
       handleSignOut()
       .then(res =>{
        handleUpdate(res,false)
       })
    }
    const handleUpdate = (res,redirect)=>{
        setUser(res);
        setSignedInUser(res);
        if(redirect){
        history.replace(from); 
        }
    }
  // console.log(user.isSignedIn)
    return (
        <div>
            This is Log In
           <div>
               {
                user.isSignedIn && user.isSignedIn? <button onClick={signOut}>Sign out</button> : 
                <button onClick={googleSignin}>Sign in</button>
               }
               <br/>
               <br/>
               <button onClick={faceBookSignIn}>FaceBook SignIn</button>
            </div>
            <br/>
            <form onSubmit={handleSubmit}>

               <input onChange={()=>setSingeupUser(!singeupUser)} type="checkbox" name="new-user"/>
               <label htmlFor="new-user">Check to {singeupUser ? "SignIn":'SignUp'}</label>
               <br/>
               {
                   singeupUser && <input onBlur={handleInputData}  type="name" name="name" placeholder='Your name' />
               }
                <br/>
                <input onBlur={handleInputData} type="email" name="email" placeholder='Your email'required/>
               <br/>
                <input onBlur={handleInputData} type="password" name="password" placeholder = 'Your password' required/>
                <br/>
                <input type="submit" value={singeupUser ? "SignUp":'SignIn'}/>
                <br/>                                                                         
            </form>
            {
                user.error && <p style={{color:"red"}}>{user.error}</p>
            }
            {
                user.success && <p style={{color:'green'}}>Log in success!!</p>
            }
        </div>
    );
};

export default LogIn;