
import './css/process.css';
// import Logo from'./logo.png';
import React, { useState, Component , useEffect} from 'react';
import ComponentMosaic from '../../../block/bundle/ComponentMosaic'
import {packBlocks} from '../../../../util/nodeFormations'
// import ReactJson from 'react-json-view'
import ReactFlow, {
  addEdge,
  Handle, 
  Position,
  MiniMap,
  Controls,
  Background,
      } from 'react-flow-renderer';
// import Hexagon from 'react-hexagon';

import Draggable from 'react-draggable';

//********************************************************




var commune = null
export default class ProcessNode extends Component {


  constructor(props)  {
    super(props) 

    // General

    commune = this.props.commune
    this.expansion_factor = this.props.expansion_factor? this.props.expansion_factor: 3
    this.data = this.props.data
    this.cfg = this.props.data.cfg
    this.name = this.props.data.name.replace(/_/g, ' ')
    this.style = this.props.data.dims
    console.log(this.cfg, 'CFG, process', this.name)


    this.state = {
        expand: false
    }

    this.handles = {
      write: this.getWriteHandles(),
      read: this.getReadHandles()
    }

  }



        
  getWriteHandles() {

    let handles = []
    if (this.cfg.write) {
        let step_size = this.style.process.height / (Object.keys(this.cfg.write).length+1)
    
        let i = 0
        for (let write_key of Object.keys(this.cfg.write).sort()) {
            handles.push(
          <div className='handle-write'  style={{ position: "absolute", top: step_size*(i+1), right:-this.style.handle.width/4, ...this.style.handle}}>
    
          <Handle type="source" 
                  id={write_key}
                  position={Position.Bottom} 
                  style={{ top: "50%", visibility : 'hidden'}}>
            
            {/* {write_key.replace(/_/g, ' ')} */}
          
        </Handle>
        </div>)
   
        i += 1
        }
    
      
      }
    
   return handles
   }


  getReadHandles() {

   let handles = []
   if (this.cfg.read) {


    let read_keys = []
    for (let read_key of Object.keys(this.cfg.read).sort()) {
     if (!(this.cfg.write && read_key in this.cfg.write)) {
       read_keys.push(read_key)
     }
    }
    
    let step_size = this.style.process.height / (read_keys.length+1)

    let i = 0
    for (let read_key of read_keys.sort()) {
    
      handles.push(
      <div className='handle-read' style={{ position: "absolute", top: step_size*(i+1), left:-this.style.handle.width/2, ...this.style.handle}}>
      <Handle type="target" 
              id={read_key}
              position={Position.Top} 
              style={{ top: "50%", visibility : 'hidden'}}>

        {/* {read_key.replace(/_/g, ' ')} */}
      
    </Handle>
    </div>)
     i += 1
    }
  }
  return handles
  }

  getConfigComponent() {
    return <Draggable>
    {/* <ReactJson src={this.cfg}/> */}
    </Draggable>
  }

  getSubBlocks() {
    let expansion_factor = this.state.expand ? this.expansion_factor:1
    let props = {
      blocks : this.cfg,
      name: `main-mosaic${ this.state.expand ? '-expand': ''}`,

      key: `main-mosaic${ this.state.expand ? '-expand': ''}`,
      default_block_props: {
          className: 'subprocess',
      },
      style : {
              width: this.style.process.width*expansion_factor, 
               position: 'absolute', 
               top: '20%',
               height: 0.8*this.style.process.height*expansion_factor}
    }

    return <ComponentMosaic {...props}/>
  }
  
  getIntro() {

    return    (<div className='process-node'  style={{textAlign: "center",...this.style.process}} onClick={(event)=>{this.setState({expand: !this.state.expand}); event.stopPropagation()}}>
    <div className='process-header' style={{textAlign: "center"}}>
      {this.name}
    </div>
     {this.handles['read']}
     
     {this.handles['write']}
     </div> )
  }

  getExpansion() {
    let handles = {
      write: this.getWriteHandles(),
      read: this.getReadHandles()
    }

    let sub_blocks = this.getSubBlocks()

  
    return    (<div className='process' style={{textAlign: "center", width: this.style.process.width*this.expansion_factor, height: this.style.process.height*this.expansion_factor}} onClick={(event)=>{this.setState({expand: !this.state.expand}); event.stopPropagation()}}>
    <div className='process-header'  style={{textAlign: "center"}}>
      {this.name}
    </div>
     {this.handles['read']}
     {this.handles['write']}
     {sub_blocks}
     </div> )
  }

  render ()  {
 

    if (this.state.expand) {
      return (this.getExpansion())
    } else  {
      return (this.getIntro())
    }
    

 }

 async componentDidMount()
 {
 }







}



