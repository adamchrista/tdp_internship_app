import React from "react";

export class Welcome extends React.Component{

    onSubmitRegister = () => {
        this.props.history.push('/Register');
    }

    onSubmitLogIn = () => {
        this.props.history.push('/Login');
    }

    render(){
        return(
            <div className="text-gray-800 m-32">
                <div className="flex items-center mb-10">
                    <h1 className="text-center font-extrabold text-5xl">Contact Risk/Immunity Prediction with Community Detecting</h1>
                </div>
                <div className="text-center font-extrabold"> 
                    <p className="text-xl">  Create an account! </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded" onClick={this.onSubmitRegister}> Sign Up</button>
                    <p className="text-xl"> Have an account? </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded" onClick={this.onSubmitLogIn}> Log in </button>
                </div>
            </div>
        );
    }
}