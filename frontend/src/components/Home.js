import React, { Component } from "react";
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink, ForceGraphArrowLink } from 'react-vis-force';
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';
import axios from 'axios'

const ITEMS = [
  {title: 'Your Community', color: "blue"},
  {title: '1st Closest Community', color: "green"},
  {title: '2nd Closest Community', color: "red"},
  {title: '3rd Closest Community', color: "yellow"},
  {title: '4th Closest Community', color: "orange"},
  {title: '5th Closest Community', color: "purple"},
  {title: '6th Closest Community', color: "pink"},
  {title: '7th Closest Community', color: "brown"},
  {title: 'All Other Communities', color: "black"}
]

export default class Home extends Component {



    constructor(props) {
        super(props);
        this.state = {
          nodes: [],
          edges: [],
          list_of_colors: [],
          network_and_community_data:[]
          
        };
      }



      componentDidMount() {
        axios.get('http://localhost:4000/team-y-nots/home/'+this.props.match.params.id)
            .then(response => {
    
              this.setState({
                nodes: response.data.nodes,
                edges: response.data.edges,
                list_of_colors: response.data.list_of_colors,      
                network_and_community_data: response.data.full_network_and_community_data
              })
            })
            .catch(function (error){
                console.log(error);
            })
        }



    render(){



        const {nodes, edges, list_of_colors, network_and_community_data} = this.state;
        const endingNodes = nodes.slice(1);
        const startingNode = nodes.slice(0,1);
        

        const myStyle = {
          position: "absolute",
          left: '430px',
          top: '80px'
        }

        const legendStyle = {
          position: "absolute",
          left: '1125px',
          top: '80px'
        }



        return(
          
            <div class="space-y-6">
            
            <div className="rounded-md shadow-lg w-1/3 bg-white">
                <div className="p-4">
                  <h3 className="font-bold text-2xl mb-2">Risk In Network: {network_and_community_data[6]}%</h3>
                  <h3 className="text-2x1 mb-2">({network_and_community_data[1]} out of {network_and_community_data[0]} diagnosed with COVID-19)</h3>
                </div>
            </div>

            <div className="rounded-md shadow-lg w-1/3 bg-white">
                <div className="p-4">
                   <h3 className="font-bold text-2xl mb-2">Immunity In Network: {network_and_community_data[7]}%</h3>
                    <h3 className="text-2x1 mb-2">({network_and_community_data[2]} out of {network_and_community_data[0]} immune to COVID-19)</h3>
                </div>
            </div>

            <div className="rounded-md shadow-lg w-1/3 bg-white">
                <div className="p-4">
                  <h3 className="font-bold text-2xl mb-2">Risk In Community: {network_and_community_data[8]}%</h3>
                  <h3 className="text-2x1 mb-2">({network_and_community_data[4]} out of {network_and_community_data[3]} diagnosed with COVID-19)</h3>
                </div>
            </div>
            <div className="rounded-md shadow-lg w-1/3 bg-white">
                <div className="p-4">
                  <h3 className="font-bold text-2xl mb-2">Immunity In Community: {network_and_community_data[9]}%</h3>
                  <h3 className="text-2x1 mb-2">({network_and_community_data[5]} out of {network_and_community_data[3]} immune to COVID-19)</h3>
                </div>
            </div>  
                  <h style={myStyle}>
                    <InteractiveForceGraph
                    labelAttr="label"
                    zoom
                    simulationOptions={{height: 500, width: 675, animate: true, strength: {collide: 0.05} }}
                    zoomOptions={{minScale: 0.25, maxScale: 5}}
                    highlightDependencies>
                 
                    {startingNode.map(({
                    id, label, fill, radius }) => (
                    <ForceGraphNode showLabel
                      key={id}
                      node={{
                      id,
                      label,
                      radius
          
                      }}   
                      fill={list_of_colors[fill]}
                    />
                    ))}

                    {endingNodes.map(({
                    id, label, fill, radius }) => (
                    <ForceGraphNode
                      key={id}
                      node={{
                      id,
                      label,
                      radius
          
                      }}

                      fill={list_of_colors[fill]}
                    />
                    ))}

                    {edges.map(({ source, target }) => (
                    <ForceGraphLink
                       key={source + target}
                       link={{ source, target, value: 1 }}
                    />
                    ))} 
      
          </InteractiveForceGraph>
          </h>
          <h style={legendStyle}>
          <DiscreteColorLegend height={150} width={150} items={ITEMS} />;
          </h>
          
          </div>

          


                
                  
                



            


            

        )
    }
}


/*            <div class="space-y-6">
            
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
                </div> */




/**<InteractiveForceGraph
                    labelAttr="label"
                    zoom
                    simulationOptions={{height: 400, width: 400, animate: true, strength: {collide: 0.01} }}
                    zoomOptions={{minScale: 0.25, maxScale: 5}}
                    highlightDependencies>


                    {startingNode.map(({
                    id, label, fill, radius }) => (
                    <ForceGraphNode showLabel
                      key={id}
                      node={{
                      id,
                      label,
                      radius
          
                      }}   
                      fill={list_of_colors[fill]}
                    />
                    ))}
    
    
                    {endingNodoes.map(({
                    id, label, fill, radius }) => (
                    <ForceGraphNode
                      key={id}
                      node={{
                      id,
                      label,
                      radius
          
                      }}

                      fill={list_of_colors[fill]}
                    />
                    ))}

                    {edges.map(({ source, target }) => (
                    <ForceGraphLink
                       key={source + target}
                       link={{ source, target, value: 1 }}
                    />
                    ))} 

                  </InteractiveForceGraph> */       
                  
                  /**{edges.map(link => (
                    <ForceGraphLink
                       key={`${link.target}=>${link.source}`}
                       link={{ ...link, value: 2 }}
                    />
                    ))}  */