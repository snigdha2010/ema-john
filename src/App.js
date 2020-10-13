import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Review from './components/Review/Review';
import ReviewItem from './components/ReviewItem/ReviewItem';
import Shipment from './components/Shipment/Shipment';
import LogIn from './components/LogIn/LogIn';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Inventory from './components/Inventory/Inventory';

export const UserContext = createContext()

function App() {
  const [signedInUser, setSignedInUser] = useState({})
  return (
   <UserContext.Provider value={[signedInUser, setSignedInUser]}>
    <Router>
     <Header></Header>
     <Switch>
        <Route exact path="/">
            <Shop></Shop>
        </Route>
        <Route path="/shop">
          <Shop></Shop>
        </Route>
        <Route path="/review">
          <Review></Review>
        </Route>
        <Route path="/product/:id">
          <ReviewItem></ReviewItem>
        </Route>
        <Route path = '/log-in'>
          <LogIn/>
        </Route>
        <PrivateRoute path = '/shipment'>
          <Shipment/>
        </PrivateRoute>
        <Route path='/inventory'>
          <Inventory/>
        </Route>
        <Route path="*">
            <NotFound></NotFound>
        </Route>
     </Switch>
   </Router>
   </UserContext.Provider>
    
    
  );
}

export default App;

