import React from "react";
import axios from 'axios';

export class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            company_id: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            diagnosed_with_covid: false,
            recovered_from_covid: false,
            list_of_ids_exposed: [],
        }

        this.handleOnChangeCompanyId = this.handleOnChangeCompanyId.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnChangeFirstName = this.handleOnChangeFirstName.bind(this);
        this.handleOnChangeLastName = this.handleOnChangeLastName.bind(this);
        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePhone = this.handleOnChangePhone.bind(this);
        this.handleOnChangeDiagnosedWithCovid = this.handleOnChangeDiagnosedWithCovid.bind(this);
        this.handleOnChangeRecoveredFromCovid = this.handleOnChangeRecoveredFromCovid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    handleOnChangeCompanyId = e => {
        this.setState ({
            company_id: e.target.value
        });
    };

    handleOnChangePassword = e => {
        this.setState ({
            password: e.target.value
        });
    };

    handleOnChangeFirstName = e => {
        this.setState ({
            first_name: e.target.value
        });
    };

    handleOnChangeLastName = e => {
        this.setState ({
            last_name: e.target.value
        });
    };

    handleOnChangeEmail = e => {
        this.setState ({
            email: e.target.value
        });
    };

    handleOnChangePhone = e => {
        this.setState ({
            phone: e.target.value
        });
    };

    handleOnChangeDiagnosedWithCovid = e => {    
        this.setState(prevState => ({
            diagnosed_with_covid: !prevState.diagnosed_with_covid
          }));   
    };

    handleOnChangeRecoveredFromCovid = e => {
        this.setState(prevState => ({
            recovered_from_covid: !prevState.recovered_from_covid
          }));
    };

    handleAddContact = () => {
        this.setState({
            list_of_ids_exposed: this.state.list_of_ids_exposed.concat([""])
        });
    };

    handleContactNameChange = index => evt => {
        const newContacts = this.state.list_of_ids_exposed.map((contact, cindex) => {
            if (index !== cindex) return contact;
            let id = evt.target.value;
            return id;
        });

        this.setState({list_of_ids_exposed: newContacts});
    }


    onSubmit(e) {
        

        const obj = {
            company_id: this.state.company_id,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            diagnosed_with_covid: this.state.diagnosed_with_covid,
            recovered_from_covid: this.state.recovered_from_covid,
            list_of_ids_exposed: this.state.list_of_ids_exposed,
        };
        
        axios.post('http://localhost:4000/team-y-nots/register', obj)
            .then(res => res.status);
        
        this.props.history.push('/');    
    }


    render() {


        const rightBlocks = {
            position: "absolute",
            left: "660px",
            right: "0px",
            bottom: "415px"
        }

        const diagnosedCheckbox = {
            position: "absolute",
            left: "660px",
            bottom: "360px"
        }

        const recoveredCheckbox = {
            position: "absolute",
            left: "660px",
            bottom: "320px"
        }

        const registerButton = {
            position: "absolute",
            left: "660px",
            bottom: "250px"

        }



        return (
            <form onSubmit={this.onSubmit}>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                  <div class="mb-2">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="Company ID">Company ID</label>
                    <input class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker" id="Company ID" type="text" onChange={this.handleOnChangeCompanyId} placeholder="Company ID"></input>
                  </div>
                  <div class="mb-2">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="password">Password</label>
                    <input class="shadow appearance-none border border-red rounded w-1/2 py-2 px-3 text-grey-darker mb-3" id="password" type="password" onChange={this.handleOnChangePassword} placeholder="******************"></input>
                    <p class="text-red text-xs italic">Please choose a password.</p>
                  </div>
                  <div class="mb-2">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="First Name">First Name</label>
                    <input class="shadow appearance-none border border-red rounded w-1/2 py-2 px-3 text-grey-darker mb-3" id="First Name" type="text" onChange={this.handleOnChangeFirstName} placeholder="First Name"></input>
                  </div>
                  <div class="mb-2">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="Last Name">Last Name</label>
                    <input class="shadow appearance-none border border-red rounded w-1/2 py-2 px-3 text-grey-darker mb-3" id="Last Name" type="text" onChange={this.handleOnChangeLastName} placeholder="Last Name"></input>
                  </div>
                  <div class="mb-2">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="Email">Email</label>
                    <input class="shadow appearance-none border border-red rounded w-1/2 py-2 px-3 text-grey-darker mb-3" id="Email" type="text" onChange={this.handleOnChangeEmail} placeholder="Email"></input>
                  </div>
                  <div class="mb-2" style={rightBlocks}>
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="Phone">Phone</label>
                    <input class="shadow appearance-none border border-red rounded w-1/2 py-2 px-3 text-grey-darker mb-3" id="Phone" type="text" onChange={this.handleOnChangePhone} placeholder="Phone"></input>
                  </div>
                  <div class="mb-2" style={diagnosedCheckbox}>
                    <label for="DiagnosedWithCovid">Have You Been Diagnosed With COVID-19?</label>
                    <input id="DiagnosedWithCovid" type="checkbox" onChange={this.handleOnChangeDiagnosedWithCovid}></input>
                  </div>
                  <div class="mb-2" style={recoveredCheckbox}>
                    <label for="RecoveredFromCovid">Are You Immune To Or Recovered From COVID-19?</label>
                    <input  id="RecoveredFromCovid" type="checkbox" onChange={this.handleOnChangeRecoveredFromCovid}></input>
                  </div>
                  {
                      this.state.list_of_ids_exposed.map((contact, index) => (
                          <div className="contact">
                              <input type="text" placeholder="Contact Name" value={contact.value} onChange={this.handleContactNameChange(index)}/>
                            </div>
                      ))
                  }

                  <button type="button" onClick={this.handleAddContact}>Add Contact</button>
                
                   
    
                  <div class="flex items-center justify-between" style={registerButton}>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded" type="button" onClick={this.onSubmit}>Register</button>               
                  </div>                 
                  
                  
              </div>
              
            </form>  
          );
    }
}
