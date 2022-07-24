
import './css/main.css';
import React, { useState, Component , useEffect} from 'react';
import { Input, Label, Menu } from 'semantic-ui-react'
import PortfolioMarket from './market/portfolio'
import Logo from'./market/logo.png';
import Draggable from 'react-draggable';
import {manager as communeManager} from "./commune";
import PipelineBuilder from './model/pipeline/builder'
//********************************************************
import {MainContext, default_main_context} from '../../context'



let commune = new communeManager()


export default class MarketSidebar extends Component {

  
  constructor(props)  {
    super(props)
    this.state = {
       page: 'build',
       expand_sidebar: true

      }


    this.value= []



  }


  getMarketSelection = () => {
    const initial_top = 200
    const button_height = 100
    const margin = 30
    let buttons_list = []

    buttons_list.push(
      <button className='marketsidebarbutton' style={{top:initial_top+button_height+margin}} onClick={()=> this.setState({page:'market'})}>
        DeFI
      </button>)
    buttons_list.push(
      <button className='marketsidebarbutton' style={{top:initial_top+2*(button_height+margin)}} onClick={()=> this.setState({page:'market'})}>
        DeDate
      </button>)
    buttons_list.push(
      <button className='marketsidebarbutton' style={{top:initial_top+(button_height+margin)*3}} onClick={()=> this.setState({page:'market'})}>
        DeMusic
      </button>)
    buttons_list.push(
      <button className='marketsidebarbutton' style={{top:initial_top+(button_height+margin)*4}} onClick={()=> this.setState({page:'market'})}>
        DeArt
      </button>)

    return (<div id='sidebar' className='sidebar' onDoubleClick={(e)=>{this.setState({expand_sidebar:!this.state.expand_sidebar})}}>
    <div className='sidebarlogo'>
    <img src={Logo} style={{position:'absolute',
        width: '100%',
        top: '20%',
        height: '100%'}} ></img>
    </div>
    <h1 id='card-title' style={{position: "relative",
    top: "0px",
    fontSize: "50px",
    width: "100%",
    color: "white",
    fontFamily: "Copperplate",
    textAlign: "center"}} >commune
    </h1>
    
    {this.getMenuSelector()}

    {buttons_list}

    

  </div>
  )
  }

  getContractedSidebar = () => {
    return (<div className='contractedSidebar' onDoubleClick={(e)=>{this.setState({expand_sidebar:!this.state.expand_sidebar})}}>
      <img src={Logo} style={{position:'absolute',
          width: '80%',
          left: '10%',
          top:'10%',
          height: '80%'}} ></img>
      </div>)
  }

  getSidebar = () => {

    if (this.state.expand_sidebar) {
      return this.getMarketSelection()
    } else {
      return this.getContractedSidebar()
    }

  }

  render() {
    return (this.getSidebar())
        
    )   
  }

  setWindowDimensions = () => {
    this.setState({window: {height: window.innerHeight,
      length: window.innerWidth}})
  }
}





