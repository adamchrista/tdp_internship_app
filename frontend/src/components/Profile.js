import React from "react";
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Row, Col
} from 'reactstrap';


// const Profile = () => {
export class Profile extends React.Component {
  render() {
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
  };
}

export default Profile;
{/* export default Profile; */ }