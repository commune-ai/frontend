
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
import {ModuleTreeContext} from '../context';
//********************************************************




var commune = null
export default class ProcessNode extends Component {


  constructor(props)  {
    super(props) 

    // General

    commune = this.props.commune
    this.data = this.props.data
    this.cfg = this.props.data.cfg
    this.name = this.props.data.name.replace(/_/g, ' ')
    this.style = this.props.data.style
    this.expand_style = this.props.data.expand_style
    this.expand = this.props.data.expand

    this.state = {
        expand: false
    }

    // this.handles = {
    //   write: this.getWriteHandles(),
    //   read: this.getReadHandles()
    // }

  }

  getSubBlocks(depth_limit=2) {
    let props = {
      blocks : this.cfg,
      name: `main-mosaic${ this.state.expand ? '-expand': ''}`,
      depth_limit: depth_limit,
      key: `module${this.name}${this.state.expand ? '-expand': ''}`,
      style : {
              width: this.expand_style.width, 
               position: 'absolute', 
               top: '20%',
               height: 0.8*this.expand_style.height}
    }


    return <ComponentMosaic {...props}/>
  }
  
  generate_key(suffix) {
    return this.name+'_'+this.state.expand +  '_'+ suffix
  }
  getIntro = () => {
    let component = (

        
      <div className='process-node' style={this.style} onClick={this.expandProcess}>
      <div className='process-header' >
        {this.name}
      </div>
       </div>)
     
    return component
    
  }


  expandProcess = (event) => {
    // this.setState({expand: !this.state.expand}); 
    this.moduleTreeExpand(this.props.id)
    // event.stopPropagation()
  }

  getExpansion() {

    let sub_blocks = this.getSubBlocks()


    return    (
  

    <div className='expand-process-node' style={this.expand_style} onClick={this.expandProcess}>
    <div className='process-header'>
      {this.name}
    </div>
     {sub_blocks}
     </div>)
  }

  render ()  {
    return <ModuleTreeContext.Consumer>

      {
        ({state ,setExpand}) => {
          this.moduleTreeExpand = setExpand

          if (this.expand == this.name) {

            return this.getExpansion()

          } else  {
            return this.getIntro()
          }
        }
      }
    </ModuleTreeContext.Consumer>

    

 }

 componentDidUpdate()
{
  console.log('process update: ', this.props.key)

  
}
componentDidMount()
 {
   console.log('MOUNT', this.props.id, this.expand)
 }






}



