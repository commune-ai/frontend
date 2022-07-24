
import './css/main.css';
import React, { useState, Component , useEffect} from 'react';
import { Input, Label, Menu } from 'semantic-ui-react'
import PortfolioMarket from './portfolio'
import Logo from'./logo.png';
import Draggable from 'react-draggable';
import {manager as communeManager} from "..";
import PipelineBuilder from '../builder/pipeline/builder'
import {defaut_main_context, MainContext} from '../../context'
//********************************************************



let commune = new communeManager()


export default class MarketPage extends Component {

  
  constructor(props)  {
    super(props)
    this.state = {
       windowStyle : {width: window.innerWidth,
                     height:window.innerHeight},
       expand_sidebar: true

      }


    this.value= []

    window.addEventListener('resize', this.setWindowDimensions)


  }

  setPage = (page) => {
    this.setState({"page":page})
  }

  getMarketSelection = () => {
    const initial_top = 200
    const button_height = 100
    const margin = 30
    let buttons_list = []
    for (const [i,market_key] of ['DeFI', 'DeDate', 'DeMusic'].entries()) {
      buttons_list.push(
        <button className='marketsidebarbutton' style={{top:initial_top+i*(button_height+margin)}} onClick={()=> this.setState({page:'market'})}>
          {market_key}
        </button>)

    }


    let title = (
      <h1 id='card-title' style={{position: "relative",
      top: "0px",
      fontSize: "50px",
      width: "100%",
      color: "white",
      fontFamily: "Copperplate",
      textAlign: "center"}} >commune
      </h1>
    )
    let logo = (
      <div className='sidebarlogo'>
      <img src={Logo} style={{position:'absolute',
          width: '100%',
          top: '20%',
          height: '100%'}} ></img>
      </div>
    )



    return (
    <div id='sidebar' className='sidebar' onDoubleClick={(e)=>{this.setState({expand_sidebar:!this.state.expand_sidebar})}}>
    {logo}
    {title}
    
    <MainContext.Consumer>
    {({page, setPage}) => {
      return this.getPageSelector(setPage)
    }}
    </MainContext.Consumer>

    {buttons_list}

    

  </div>
  )
  }
  getPageSelector = (setPage) => {
    let buttons_list = []
    buttons_list.push(
      <button className='sidebarbutton' style={{left:"49%"}} onClick={()=> setPage('market')}>
        Market
      </button>)
    buttons_list.push(
      <button className='sidebarbutton' onClick={()=> setPage('build')}>
        Build
      </button>)

    return buttons_list 
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

  getPage = () => {
        return (

            <div className='market'>
                <Draggable>
                <div>
                <PortfolioMarket commune={commune}/>
                </div>
                </Draggable>
            </div>
            
        )
      }



  render() {

    return (
      <div className='env'>


        {this.getPage()}
        {this.getSidebar()}
    </div>
        
    )   
  }

  setWindowDimensions = () => {
    this.setState({window: {height: window.innerHeight,
      length: window.innerWidth}})
  }
}







