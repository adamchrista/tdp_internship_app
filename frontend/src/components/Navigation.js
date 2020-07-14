import React from "react";

export class Navigation extends React.Component{
    render(){
        return(
        <div className="h-20 w-full items-center px-8 bg-blue-400 text-black-800 flex justify-between">
            <span className="ml-4">Team Y-Nots</span>
            <div className="flex ml-6 font-medium text-lg flex-1 items-start">
                <a href="home" className="ml-4 px-3 py-2 hover:bg-gray-100 rounded-md">Home</a>
                <a href="profile" className="ml-4 px-3 py-2 hover:bg-gray-100 rounded-md">Profile</a>
                <a href="about" className="ml-4 px-3 py-2 hover:bg-gray-100 rounded-md">About</a>
                <a href="register" className="ml-4 px-3 py-2 hover:bg-gray-100 rounded-md">Register</a>
            </div>
        </div>
        );
    }
}
