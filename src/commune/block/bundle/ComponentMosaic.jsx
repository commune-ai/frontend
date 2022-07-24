import React, { Component } from 'react'
import { Background } from 'react-flow-renderer'
// import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Grid, Statistic, Header, GridRow, Segment, Input } from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import './css/ComponentMosaic.css';
import {packBlocks} from '../../../util/nodeFormations'
import * as ReactDOM from 'react-dom';
import './css/ComponentMosaic.css';
import {manager as communeManager} from "../..";

const depth_color_array = [

]

let commune = new communeManager()

export default class ComponentMosaic extends Component {

  default_style = {}
  constructor(props) {
    super(props)
    

    
    this.style = this.props.style

    // array of {component:, props:}
    this.depth_color = [
      'rgba(88, 12, 209, {t})',
      'rgba(9, 218, 113, {t})',
      'rgba(243, 24, 4, {t})',
      'rgba(12, 71, 209, {t})',
      'rgba(243, 4, 223, {t})',
      'rgba(209, 157, 12, {t})',
 
    ]



    this.backgroundTransparancy= 0.3



    

    this.depth = this.props.depth? this.props.depth:0

    this.backgroundColor = this.depth_color[this.depth%this.depth_color.length]


    console.log(this.props.hideText, 'DEBUG ')
    this.backgroundColor = this.backgroundColor.replace('{t}', `${this.backgroundTransparancy}`)
    this.default_block_props =  {className: `block`, style: {backgroundColor:this.backgroundColor }}
    this.render_blocks = []



    this.reorganizeBlocks()

    this.name = props.name
    this.displayName = this.name.replace(/_/g, ' ')
    this.state = {
      expand_block: null
    }
    this.selectBlock.bind(this)

  }


  isModule() {
    let isModule = false
    let blocks = this.props.blocks
    if (typeof blocks == 'object'){
      isModule = 'module' in blocks && 'module' in blocks
    }
    return isModule
  }

  isConfig() {
    let isConfig = false
    let blocks = this.props.blocks
    if (typeof blocks == 'object'){
      isConfig = 'module' in blocks && 'config' in blocks
    }
    return isConfig  && Boolean(this.state.expand_block == 'config')
  }
  reorganizeBlocks() {
    this.blocks = this.props.blocks
  }


  selectBlock(block_id) {



      if (this.state.expand_block == block_id ) {
        this.setState({expand_block : null, expand:false})
      } else {
        this.setState({expand_block : block_id, expand:true})
      }

      






  }


  getBlocks() {


    let [block_styles, block_bundle_style] = packBlocks({parentDims: this.style,
                                                      blocks:Object.values(this.blocks).length,           
                                                      return_bundle_style:true,
                                                      padding: this.depth == 0? {height: [0,0], width: [0,0]}: {height: [0,0.04], width: [0,0.04]},
                                                      margin : {height:0.02, width:0.02}})
    let block_array = []
    let expand = false

    // if ( Object.keys(this.blocks).length == 1 && !this.state.expand_block) {
    //   console.log('ONE BLOCK')
    //   this.selectBlock(Object.keys(this.blocks)[0])

    // }

    for (let [i,[block_key,block]] of Object.entries(this.blocks).entries()) {

      if ( this.state.expand_block == block_key) {
        expand = true
        block_styles[i] = block_bundle_style
      }
      else if (this.state.expand_block!=null &&  this.state.expand_block != block_key) {
        continue
      } 

      let props =  block.props ? block.props: this.default_block_props
      props.style = props.style? props.style: {}
      props.style = {...props.style, ...block_styles[i]}
      props.style.fontSize = props.style.height / 3
      props.key = this._reactInternals.key +'_'+  block_key + '_' + expand

      
      if (this.isConfig() && block_key == 'config') {
        if (!this.state.cfg) {
          commune.api.config(block).then((cfg)=>{this.setState({cfg:cfg})})
        } else {
          block = this.state.cfg
        }
        }

      

      let terminal_node = (typeof block == 'object')

      props.onClick =  (event)=>{
        this.selectBlock(block_key);

        if ( this.depth >= 0 ) {
          event.stopPropagation()
        }
        }
      let component_type = block.component
  




      if  (terminal_node){

        props.name = block_key
        props.blocks = block
        props.depth = this.depth + 1

        props.expand = expand


        block_array.push(
          <ComponentMosaic  {...props}> {block_key}</ComponentMosaic>
        )

      }
      else {
        
        props.style.color = 'white'
        let displayBlockName = block_key.replace(/_/g, ' ')
        block_array.push(
          <div  {...props} >
        <div className='centerText' >
          <p>{displayBlockName}</p>
        </div>
            
          </div>
        )
      }

    }
    if (!this.props.expand && this.depth > 0) {
      block_array.push(<div {...this.props} style= {{top:0,left:0, width: '100%', height: '100%'}}>
        <div className='centerText' >
          <p>{this.displayName}</p>
        </div>
      </div>)

    }




    return block_array
  }



  componentDidUpdate() {

  }


  render() {
    // const { log } = this.state

    console.log(this._reactInternals.key, 'isConfig', this.isConfig())

    this.render_blocks = this.getBlocks()


    // console.log('DEBUG-INTERNALS', this._reactInternals.key, this._reactInternals) 

    // this.blocks = ...blocks
    return(
      
      <div {...this.props}>
      {this.render_blocks}
      </div>
        
    )
    ;
  }


  componentDidMount() {

    // console.log(this._reactInternals.key, 'MOUNT')
  }
  componentWillUnmount() {
  }
}
