
import './css/builder.css';
// import Logo from'./logo.png';
import React, { useState, Component , useEffect} from 'react';

// import ReactJson from 'react-json-view'
import DataEdge from './edge/data.js'
import ReactFlow, {
  addEdge,
  Handle, 
  Position,
  MiniMap,
  Controls,
  Background,
      } from 'react-flow-renderer';
// import Hexagon from 'react-hexagon';
import {manager as communeManager} from "../..";
import ProcessNode from "./node/process"
import Draggable from 'react-draggable';

//********************************************************

var commune = null


export default class PipelineBuilder extends Component {


  constructor(props)  {
    super(props) 
    // General
    commune = this.props.commune

    this.nodes = []
    this.edges = []
    this.nodeTypes = {
      process: ProcessNode

    }
    this.edgeTypes = {
      data: DataEdge
    }

    this.state = {
      config: null,
      name: null,
      pipeline: null
    }

    this.dims =  {
      'process': {width:400, height:400},
      'handle': {width: 50, height:50}
    }

    window.addEventListener('resize', this.setWindowDimensions)


  }
      


  getPipeline = () => {
    commune.api.launch().then(
    
      (cfg)=> { 
        console.log(cfg, "PIPELINE")
        if ( this.state.name != cfg.name) {
  
          this.setState({config: cfg,
            name: cfg.name.replace(/_/g, ' '),
            pipeline : cfg.pipeline})

        }
      })
    }


    async componentDidMount()
  {
    this.getPipeline()
  }

  getNodes= () => {
    let nodes = []
    let i = 0
    let step_size = this.dims.process.width
    let margin = this.dims.process.width
    for (const [process_key, process_data] of Object.entries(this.state.pipeline.dag)) {
      nodes.push( {
        id: process_key,
        type: 'process',
        position: { x: window.innerWidth*0.1 +(step_size+margin)*i , y: window.innerHeight / 2 },
        data: {cfg: process_data.template, name: process_key, dims: this.dims, commune: commune }
      }
      )
      i += 1

    }
    return nodes
  }



  getEdges = () => {

    let edges = []
    console.log(this.state.pipeline['adapter'], "PIPELINE")
    for (const step_r of Object.keys(this.state.pipeline.dag)) {
      for (const step_w of Object.keys(this.state.pipeline.dag)) {
        if (this.state.pipeline.dag[step_r].template.read && this.state.pipeline.dag[step_w].template.write) {

        
        for (const read_key of Object.keys(this.state.pipeline.dag[step_r].template.read)) {
          for (const write_key of Object.keys(this.state.pipeline.dag[step_w].template.write)) {
            if (( step_r != step_w)&& (read_key == write_key)) {
              
              edges.push(
                {id: `edge-${step_w}-${step_r}-${read_key}`,
                source: step_w,
                target: step_r,
                sourceHandle: write_key,
                targetHandle: read_key,
                style:{strokeWidth: "10px", fontSize: "20px"},
                labelStyle: {fontSize: '30px'},
                label: read_key.replace(/_/g, ' '), 
                labelBgPadding: [2, 8],
                labelBgBorderRadius: 5,
                animated:true,
                labelBgStyle: { fill: '#FFCC00', 
                        textAlign: 'center', color: '#fff',  fillOpacity: 1.0, fontSize: "30px" }})
             }
      }}}}}


    return edges
    }
  
    EdgesFlow = () => {
    
      // const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
      return (
        <ReactFlow
          elements={this.nodes.concat(this.edges)}
          // onConnect={onConnect}
          snapToGrid={true}
          edgeTypes={this.edgeTypes}
          nodeTypes={this.nodeTypes}
          attributionPosition="top-right"
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      );
    };

  render() {    
    
    if (this.state.name) {
      this.nodes = this.getNodes()
      this.edges = this.getEdges()

      return this.EdgesFlow()
      
    } else 
    return (<div></div>)
    }

  setWindowDimensions = () => {
    this.setState({window: {height: window.innerHeight,
      length: window.innerWidth}})
  }
}



