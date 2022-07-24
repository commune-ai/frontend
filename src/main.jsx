
import './css/main.css';
import React, { useState, Component , useEffect} from 'react';
import { Input, Label, Menu } from 'semantic-ui-react'
import PortfolioMarket from './commune/market/portfolio'
import Logo from'./commune/market/logo.png';
import Draggable from 'react-draggable';
import {manager as communeManager} from "./commune";
import PipelineBuilder from './commune/builder/pipeline/builder'
import {defaut_main_context, MainContext} from './context'
import MarketPage from './commune/market/main'
import BlockMLPage from './commune/builder/main'
//********************************************************



let commune = new communeManager()


export default class MainPage extends Component {

  
  constructor(props)  {
    super(props)
    this.state = {
       page: 'build',
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



  getPage = () => {
      if (this.state.page == 'market') {
        return <MarketPage commune={commune}/>
      }
      else if (this.state.page == 'build') {
        return <BlockMLPage commune={commune}/>

    }
      else {
          return <div></div>
      }

  }

  render() {

    let context = {page: this.state.page,setPage:this.setPage}
    return (
      <div className='env'>

        <MainContext.Provider value={context}>
        {this.getPage()}
        </MainContext.Provider>
    </div>
        
    )   
  }

  setWindowDimensions = () => {
    this.setState({window: {height: window.innerHeight,
      length: window.innerWidth}})
  }
}





