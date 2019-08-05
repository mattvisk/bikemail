import React from 'react';
import './App.css';
import Nav from './Nav';
import Shop from './Shop';
import Signup from './Signup';
import About from './About';
import ItemDetail from './itemDetail';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Nav/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/shop/:id" component={ItemDetail} />
      </Switch>
    </div>
    </Router>
  );
}




export default App;

