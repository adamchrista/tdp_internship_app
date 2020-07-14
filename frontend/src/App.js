import React from 'react';
import { Navigation } from "./components/Navigation"
import  Home  from "./components/Home"
import { Profile } from "./components/Profile"
import { About } from "./components/About"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (

    <Router>
      <div className="App">
        <Navigation/>
        <Switch>
          <Route path ="/" exact component={Login}/>
          <Route path ="/home/:id" component={Home}/>
          <Route path ="/about" component={About}/>
          <Route path ="/profile/:id" component={Profile}/>
          <Route path ="/register" component={Register}/>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
