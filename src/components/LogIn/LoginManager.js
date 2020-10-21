import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../../firebase.Config';

export const firebaseIntitalize = () =>{ 
    if(firebase.apps.length === 0){
     firebase.initializeApp(firebaseConfig);
    }
}
export const handleFbSignIn = () =>{
    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        const newUser = {}
        newUser.isSignedIn = true
        return newUser;
       
      }).catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage)
       
      });
}
export const handleGoogleSignin = () =>{
var googleProvider = new firebase.auth.GoogleAuthProvider();
return firebase.auth().signInWithPopup(googleProvider)
.then(res => {
   const {displayName,email,photoURL} = res.user
   const newUserInfo = {
       isSignedIn: true,
       name: displayName,
       email: email, 
       photo: photoURL,
       success: true
       
   };
   setUserToken()
   return newUserInfo;
})
.catch(err =>{
   console.log(err.message)
})
}
const setUserToken = () =>{
    firebase.auth().currentUser.getIdToken()
    .then(function(idToken) {
      sessionStorage.setItem('token',idToken)
      }).catch(function(error) {
        // Handle error
      });
}

const updateUserInfo = (name)=>{
    let user = firebase.auth().currentUser;

    user.updateProfile({
    displayName: name
    }).then(function() {
    console.log('name updated successfully')
    }).catch(function(error) {
    // An error happened.
    });
}
export const handleSignUp = (email,password,name) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res=>{
        const newUserInfo = {}
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserInfo(name)
        return newUserInfo
    })
    .catch(err=>{
        const newUsserInfo = {};
        newUsserInfo.error = err.message;
        newUsserInfo.success = false;
        }
    ); 
}
export const handleSignIn = (email,password) =>{
firebase.auth().signInWithEmailAndPassword(email, password)
.then(res=>{
    const newUserInfo = {}
    newUserInfo.error = '';
    newUserInfo.success = true;
    return newUserInfo;
   
})
.catch(err=>{
    const newUsserInfo = {};
    newUsserInfo.error = err.message;
    newUsserInfo.success = false;
    }); 
} 

export const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(function() {
        const newUserInfo = {
            isSignedIn:false,
            name:'',
            email: '', 
            photo: ''
        }
        return newUserInfo
        console.log('Sign-out successful.') 

      })
      .catch(function(error) {
        // An error happened.
      });
}