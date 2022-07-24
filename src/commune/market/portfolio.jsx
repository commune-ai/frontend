
import '../css/App.css';
import '../css/market.css';
import '../css/shapes/hexagon.css';
// import Logo from'./logo.png';
import {MarketContext, default_market_context} from './context'
import React, { useState, Component , useEffect} from 'react';
import Logo from '../../files/img1_bayc.jpeg'

import ReactFlow, {
       MiniMap,
       Handle,
       Position,
       Background      } from 'react-flow-renderer';
import CustomEdge from '../../util/CustomEdge';
// import Hexagon from 'react-hexagon';
import {generateSprawlBlocks} from "../../util/nodeFormations"

import { Card, Menu, Image, Segment, Sidebar, Icon, Header, Statistic } from 'semantic-ui-react';

import MarketItemPortfolio from '../model/marketItem/portfolio'

import {getStruct} from '../utils/types/struct.js'

import {manager as communeManager} from "../..";

import Draggable from 'react-draggable';


//********************************************************

let commune 


export const metaMarketStyle = {
  width : 500,
  height : 400,

  borderRadius: 30,
  borderStyle : 'none',
  backgroundColor : '#24292e',
  border: '10px solid green',
  overflow : "hidden",
};


export default class PortfolioMarket extends Component {

  static contextType=MarketContext

  constructor(props)  {
    super(props) 
    // General

    this.state = {
       nodes: [],
       windowStyle : {width: window.innerWidth,
                     height:window.innerHeight},
       expand: false,
      
      market: default_market_context
      }

     
    commune = this.props.commune

    this.value= []

    window.addEventListener('resize', this.setWindowDimensions)


  }

  hubNode= ({id, data, style}) =>
{

  let ROI =0
  let marketValue= 0

  return(
  <div className="marketContract" style={style} onDoubleClick={()=>{this.setState({'expand': !this.state.expand})}}>
<h1 id='card-title' style={{position: "absolute",

top: "20%",
fontSize: "50px",
width: "50%",
color: "white",
fontFamily: "Copperplate",
left: "10%",

textAlign: "left"}} >GME Apes</h1>

<img src={Logo} style={{ width:"200px", height:"200px", position:'absolute', top: '10%', left: '50%'}} ></img>


<Statistic.Group widths='3' style={{position:"absolute", bottom: "10%", width:"100%"}}>
    
    <Statistic inverted color="white" size='medium'  inverted>
      <Statistic.Value >
        {5}
      </Statistic.Value>
      <Statistic.Label style={{fontSize:20}}>Communes</Statistic.Label>
    </Statistic>

    
    <Statistic color={ROI<0?"red": "green" } inverted size='medium' >
      

      <Statistic.Value >{ROI}%</Statistic.Value>
      
      <Statistic.Label  style={{fontSize:20}} > Avg ROI</Statistic.Label>
    </Statistic>
    <Statistic color="yellow" inverted size='medium'>
      <Statistic.Value >{marketValue} </Statistic.Value>
      <Statistic.Label  style={{fontSize:20}} >Value Locked </Statistic.Label>
    </Statistic>
    </Statistic.Group>

  
</div>  
  );



}


 parseRawMarketItem(rawMarketItem) {

    let marketItem=getStruct(rawMarketItem)
    marketItem.id = Number(marketItem.id).toString()
    return marketItem
  }
  
   getNodes=  async () => {
    await commune.connect()


    console.log("GET NODES")

    const marketContract = await commune.getContractFromAlias("Commune", "v0", "Commune")
    let rawMarketItems = await marketContract.listItems()
    console.log(rawMarketItems, "MARKET ITEMS")
    let marketState = {
      name: await marketContract.name(),
      category: await marketContract.category()
    }

    let marketItems = []
    let modelContracts = []
    for (let i=0; i<rawMarketItems.length; i++) {
      marketItems[i] = this.parseRawMarketItem(rawMarketItems[i])
      modelContracts[i] = await commune.getContractFromAddress("ModelPortfolio",marketItems[i].model)
    }

    let hub_position = { x: (window.innerWidth - metaMarketStyle.width)/2 , y: (window.innerHeight - metaMarketStyle.height)/2  }


        
    let nodes = [
      this.hubNode({
        id:marketState.name,
        data: marketState,
        style : {position: 'absolute',
                 left:hub_position.x,
                 top:hub_position.y }
      })
    ]


      let marketItemNodePositions = generateSprawlBlocks( hub_position, {width:5, height:5}, 
                                                        {width: metaMarketStyle.width, height:metaMarketStyle.height} ) 



      marketItems.map((marketItem, i )=>{

        let marketId = `market-${marketItem.model}`
        let marketItemPosition = marketItemNodePositions[i]


      nodes.push(
          <MarketItemPortfolio
          id= {marketId}
          style= {{top: marketItemPosition.y, 
                  left:marketItemPosition.x,
                  position:'absolute' }}
          data= {{model:modelContracts[i], commune:commune}}
          />)
        
  
      // nodes.push(
      //   { id: `eHUB-${marketId}`, source: 'marketHub', target: marketId, sourceHandle : 'write',  animated: true, style : {stroke : '#64e8ba', strokeWidth : '20px'} }
      
      // )
    })
      
  

 
    
    this.setState({nodes:nodes})
  }
    


    async componentDidMount()
  {
      
      await this.getNodes()
  }

  render() {    
    console.log("EXPAND", this.state.expand) 

    let context = {market: this.state.market, setMarket:this.setMarket}
    if (this.state.expand) {
    let nodes = this.state.nodes
    return  (
        <MarketContext.Provider value={context}>   
          {nodes.length>0 && nodes}
        </MarketContext.Provider>)
        
    } else {
      let nodes = this.state.nodes.slice(0,1)
      return (<MarketContext.Provider value={context}>   
          {nodes.length>0 && nodes}
        </MarketContext.Provider>)
    }
  }
  setMarket = (market) => {
    this.setState({"market":market})
  }

  setWindowDimensions = () => {
    this.setState({window: {height: window.innerHeight,
      length: window.innerWidth}})
  }
}



