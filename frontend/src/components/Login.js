import React from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

const LogInService = data => (
  axios.post('http://localhost:4000/team-y-nots/login', data)
    .then(res => res.status)
)

const GrabId = data => (
  axios.post('http://localhost:4000/team-y-nots/login/grabId', data)
    .then(res => res.data)
)

export class Login extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        company_id: '',
        password: '',
        error: false,
        loginSuccess: false,
        validatedMongoId: ''
        
      }

      this.onSubmit = this.onSubmit.bind(this);
      this.handleOnChangeCompanyId = this.handleOnChangeCompanyId.bind(this);
      this.handleOnChangePassword = this.handleOnChangePassword.bind(this);

    }

    handleOnChangeCompanyId = (e) => {
      this.setState({
        company_id: e.target.value,
      });
    };

    handleOnChangePassword = (e) => {
      this.setState({
        password: e.target.value,
      });
    };

    


    onSubmit = async (e) => {

      //e.preventDefault();

      const data = {
        company_id: this.state.company_id,
        password: this.state.password
      };

      const loginResult = await LogInService(data);
      const IdResult = await GrabId(data);

      console.log(loginResult);
      
      if (loginResult !== 200) {
        this.setState({
          error: true,
          loginSuccess: false
        });
      } else {
        
        this.setState({
          loginSuccess: true,
          error: false,
        
        });
      }
      this.props.history.push("/home/" + IdResult);
    };


    

    render() {

        //const {loginSuccess, error, validatedMongoId} = this.state;
        //const linkToHome = "/home/".concat(error);
        console.log("HEREEE");

        return (
          <form onSubmit={this.onSubmit}>
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="mb-4">
                  <label class="block text-grey-darker text-sm font-bold mb-2" for="username">Username</label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" onChange={this.handleOnChangeCompanyId} placeholder="Username"></input>
                </div>
                <div class="mb-6">
                  <label class="block text-grey-darker text-sm font-bold mb-2" for="password">Password</label>
                  <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" onChange={this.handleOnChangePassword} placeholder="******************"></input>
                  <p class="text-red text-xs italic">Please choose a password.</p>
                </div>
                
                <div class="flex items-center justify-between">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded" type="button" onClick={this.onSubmit}>Sign In</button>               
                </div>                 
                
                
            </div>
          </form>  
        );
    }
}

