import React from "react";

export class Login extends React.Component{
    render(){
        return(

            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="mb-4">
                  <label class="block text-grey-darker text-sm font-bold mb-2" for="username">Username</label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username"></input>
                </div>
                <div class="mb-6">
                  <label class="block text-grey-darker text-sm font-bold mb-2" for="password">Password</label>
                  <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************"></input>
                  <p class="text-red text-xs italic">Please choose a password.</p>
                </div>
                <div class="flex items-center justify-between">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded" type="button">Sign In</button>
                </div>
            </div>
        );
    }
}

