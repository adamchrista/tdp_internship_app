import React, {Component} from 'react';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import axios from 'axios'

export default class TrialGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      edges: [],
      colors: [],
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

    render() {

      const {nodes, edges, list_of_colors} = this.state;
      const endingNodoes = nodes.slice(1);
      const startingNode = nodes.slice(0,1);
    

      return (
        <h>
          <InteractiveForceGraph
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
          ))
         } 

       </InteractiveForceGraph>
         </h>

      )
            
 
    }

    
  }

  