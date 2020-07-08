import React from "react";

export class Status extends React.Component{
    render(){
        return(
            <div class="space-y-6">
            
                <div className="rounded-md shadow-lg w-1/4 bg-white">
                    <div className="p-8">
                        <h3 className="font-bold text-2xl mb-2">Number of People in Community</h3>
                    </div>
                </div>

                <div className="rounded-md shadow-lg w-1/4 bg-white">
                    <div className="p-8">
                        <h3 className="font-bold text-2xl mb-2">_ out _ have been diagnosed</h3>
                    </div>
                </div>

                <div className="rounded-md shadow-lg w-1/4 bg-white">
                    <div className="p-8">
                        <h3 className="font-bold text-2xl mb-2">Number of people in your network</h3>
                    </div>
                </div>

            </div>
        );
    }
}
