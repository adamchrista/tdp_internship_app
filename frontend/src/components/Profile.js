import React from "react";
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Row, Col
} from 'reactstrap';
import axios from "axios";





export class Profile extends React.Component {

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

  componentDidMount() {
    axios.get('http://localhost:4000/team-y-nots/profile/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          company_id: response.data.company_id,
          password: response.data.password,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          phone: response.data.phone,
          diagnosed_with_covid: response.data.diagnosed_with_covid,
          recovered_from_covid: response.data.recovered_from_covid,
          list_of_ids_exposed: response.data.list_of_ids_exposed,

        })
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  handleOnChangeCompanyId = e => {
    this.setState({
      company_id: e.target.value
    });
  };

  handleOnChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleOnChangeFirstName = e => {
    this.setState({
      first_name: e.target.value
    });
  };

  handleOnChangeLastName = e => {
    this.setState({
      last_name: e.target.value
    });
  };

  handleOnChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleOnChangePhone = e => {
    this.setState({
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

    this.setState({ list_of_ids_exposed: newContacts });
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

    axios.post('http://localhost:4000/team-y-nots/update/' + this.props.match.params.id, obj)
      .then(res => res.status);

    this.props.history.push('/home/' + this.props.match.params.id);
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

      <form class="mt-5 ml-5 w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="First Name">
              First Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="First Name" type="text" onChange={this.handleOnChangeFirstName} value={this.state.first_name}></input>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Last Name">
              Last Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Last Name" type="text" onChange={this.handleOnChangeLastName} value={this.state.last_name}></input>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Company ID">
              Company ID
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Company ID" type="text" onChange={this.handleOnChangeCompanyId} value={this.state.company_id}></input>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
              Password
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="password" onChange={this.handleOnChangePassword} value={this.state.password} placeholder="******************"></input>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Email">
              Email
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Email" type="email" onChange={this.handleOnChangeEmail} value={this.state.email}></input>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Phone">
              Phone
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Phone" type="phone" onChange={this.handleOnChangePhone} value={this.state.phone}></input>
          </div>
          <div class="mb-2" style={diagnosedCheckbox}>
            <label for="DiagnosedWithCovid">Have You Been Diagnosed With COVID-19?</label>
            <input id="DiagnosedWithCovid" type="checkbox" onChange={this.handleOnChangeDiagnosedWithCovid} checked={this.state.diagnosed_with_covid}></input>
          </div>
          <div class="mb-2" style={recoveredCheckbox}>
            <label for="RecoveredFromCovid">Are You Immune To Or Recovered From COVID-19?</label>
            <input id="RecoveredFromCovid" type="checkbox" onChange={this.handleOnChangeRecoveredFromCovid} checked={this.state.recovered_from_covid}></input>
          </div>
          {
            this.state.list_of_ids_exposed.map((contact, index) => (
              <div className="contact">
                <input type="text" placeholder="Contact ID" value={contact} onChange={this.handleContactNameChange(index)} />
              </div>
            ))
          }
          <button button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded" type="button" onClick={this.handleAddContact}>Add Contact</button>
          <div class="flex items-center justify-between" style={registerButton}>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded" type="button" onClick={this.onSubmit}>Update</button>
          </div>
        </div>
      </form >
      /* <form onSubmit={this.onSubmit}>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div class="mb-2">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="Company ID">Company ID</label>
            <input class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker" id="Company ID" type="text" onChange={this.handleOnChangeCompanyId} value={this.state.company_id}></input>
          </div>
          <div class="mb-2">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="password">Password</label>
            <input class="shadow appearance-none border border-red rounded w-1/2 py-2 px-3 text-grey-darker mb-3" id="password" type="password" onChange={this.handleOnChangePassword} value={this.state.password}></input>
            <p class="text-red text-xs italic">Please choose a password.</p>
          </div>
          <div class="mb-2">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="First Name">First Name</label>
            <input class="shadow appearance-none border border-red rounded w-1/2 py-2 px-3 text-grey-darker mb-3" id="First Name" type="text" onChange={this.handleOnChangeFirstName} value={this.state.first_name}></input>
          </div>
          <div class="mb-2">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="Last Name">Last Name</label>
            <input class="shadow appearance-none border border-red rounded w-1/2 py-2 px-3 text-grey-darker mb-3" id="Last Name" type="text" onChange={this.handleOnChangeLastName} value={this.state.last_name}></input>
          </div>
          <div class="mb-2">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="Email">Email</label>
            <input class="shadow appearance-none border border-red rounded w-1/2 py-2 px-3 text-grey-darker mb-3" id="Email" type="text" onChange={this.handleOnChangeEmail} value={this.state.email}></input>
          </div>
          <div class="mb-2" style={rightBlocks}>
            <label class="block text-grey-darker text-sm font-bold mb-2" for="Phone">Phone</label>
            <input class="shadow appearance-none border border-red rounded w-1/2 py-2 px-3 text-grey-darker mb-3" id="Phone" type="text" onChange={this.handleOnChangePhone} value={this.state.phone}></input>
          </div>
          <div class="mb-2" style={diagnosedCheckbox}>
            <label for="DiagnosedWithCovid">Have You Been Diagnosed With COVID-19?</label>
            <input id="DiagnosedWithCovid" type="checkbox" onChange={this.handleOnChangeDiagnosedWithCovid} checked={this.state.diagnosed_with_covid}></input>
          </div>
          <div class="mb-2" style={recoveredCheckbox}>
            <label for="RecoveredFromCovid">Are You Immune To Or Recovered From COVID-19?</label>
            <input id="RecoveredFromCovid" type="checkbox" onChange={this.handleOnChangeRecoveredFromCovid} checked={this.state.recovered_from_covid}></input>
          </div>
          {
            this.state.list_of_ids_exposed.map((contact, index) => (
              <div className="contact">
                <input type="text" placeholder="Contact ID" value={contact} onChange={this.handleContactNameChange(index)} />
              </div>
            ))
          }
          <div class="flex mt-6">
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox"></input>
                <span class="ml-2">I agree to the <span class="underline">privacy policy</span></span>
              </label>
          </div>
            <button type="button" onClick={this.handleAddContact}>Add Contact</button>
            <div class="flex items-center justify-between" style={registerButton}>
              <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded" type="button" onClick={this.onSubmit}>Update</button>
            </div>
          </div>

      </form> */
    );
  }

  /* /* render() {

return (
<div class="w-1/3 p-2 max-w-sm lg:max-w-full lg:flex mt-8">
  <div class="h-12 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
  </div>
  <div class="border-r border-b border-t border-l border-gray-400 bg-white pb-16 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div class="mb-8">
      <div class="text-gray-900 font-bold text-xl mb-2">Randall Stephenson</div>
      <p class="text-gray-700 text-base">	js3658 </p>
      <p class="text-gray-700 text-base">	Available </p>
      <p class="text-gray-700 text-base">	CEO and PRESIDENT </p>
    </div>
    <div class="flex items-center">
      <img class="w-10 h-10 rounded-full mr-4" src="./frontend/src/components/JohnStankey.jpg" alt="Avatar of John Stankey" />
      <div class="text-sm">
        <p class="text-gray-900 leading-none">208 S AKARD ST, Dallas, TX 75202</p>
      </div>
    </div>
  </div>
</div>
);
};*/
}

export default Profile;
{/* export default Profile; */ }