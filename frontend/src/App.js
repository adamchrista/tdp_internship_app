import React from 'react';
import { Welcome } from "./components/Welcome"
import { Navigation } from "./components/Navigation"
import  Home  from "./components/Home"
import { Profile } from "./components/Profile"
import { About } from "./components/About"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  /* The following manages Navigation bar visibility depending on current pages*/
  const MainRoute = ({ component: Component , ...rest})=>{
    return (
      <Route {...rest}  component={(props)=>(
        <div>
          <Navigation />
          <Component {...props} />
          </div>
        )}
      />
    )
  }

  const WelcomeRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        component={(props)=> (<Component {...props} />)}
      />
    );
  };

  return (

    <Router>
      <div className="App">
        <Switch>
          <WelcomeRoute path ="/" exact component={Welcome}/>
          <WelcomeRoute path ="/register" component={Register}/>
          <WelcomeRoute path ="/Login" component={Login}/>
          <MainRoute path ="/home/:id" component={Home}/>
          <MainRoute path ="/profile/:id" component={Profile}/>
          <MainRoute path ="/about" component={About}/>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
