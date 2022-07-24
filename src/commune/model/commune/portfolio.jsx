
import '../../../css/App.css';
import '../../../css/market.css';
import '../../../css/shapes/hexagon.css';
// import Logo from'./logo.png';
import {CommuneContext, default_commune_context} from './context'
import React, { useState, Component , useEffect} from 'react';
import Logo from '../../../files/img1_bayc.jpeg'

import ReactFlow, {
       MiniMap,
       Handle,
       Position,
       Background      } from 'react-flow-renderer';
import CustomEdge from '../../../util/CustomEdge';
// import Hexagon from 'react-hexagon';
import {generateSprawlBlocks} from "../util/nodeFormations"

import { Card, Menu, Image, Segment, Sidebar, Icon, Header, Statistic } from 'semantic-ui-react';

import MarketItemPortfolio from '../model/marketItem/portfolio'

import {getStruct} from '../commune/utils/types/struct.js'

import {manager as communeManager} from "../commune";

import Draggable from 'react-draggable';


//********************************************************

let commune = new communeManager()


export const metaMarketStyle = {
  width : 500,
  height : 400,

  borderRadius: 30,
  borderStyle : 'none',
  backgroundColor : '#24292e',
  border: '10px solid green',
  overflow : "hidden",
};


export default class PortfolioCommune extends Component {

  static contextType=CommuneContext

  constructor(props)  {
    super(props) 
    // General

    this.state = {
       nodes: [],
       windowStyle : {width: window.innerWidth,
                     height:window.innerHeight},
       expand: true,
      
      market: default_commune_context,
      setMarket: this.setMarket

      }


    this.value= []

    window.addEventListener('resize', this.setWindowDimensions)


  }

  hubNode= ({id, data, style}) =>
{
  let ROI =0
  let marketValue= 0

  return(
  <div className="marketContract" style={style} onClick={()=>{this.setState({'expand': !this.state.expand})}}>

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
      <Statistic.Label style={{fontSize:20}}>Models</Statistic.Label>
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

    const marketContract = await commune.getContractFromAlias("Commune", "v0")
    let rawMarketItems = await marketContract.listItems()

    let marketItems = []
    let modelContracts = []
    for (let i=0; i<rawMarketItems.length; i++) {
      marketItems[i] = this.parseRawMarketItem(rawMarketItems[i])
      modelContracts[i] = await commune.getContractFromAddress("ModelPortfolio",marketItems[i].model)
    }

    let hub_position = { x: (window.innerWidth - metaMarketStyle.width)/2 , y: (window.innerHeight - metaMarketStyle.height)/2  }


        
    let nodes = [
      this.hubNode({
        id:`marketHub`,
        data: {markets: marketItems},
        style : {position: 'absolute',
                 left:hub_position.x,
                 top:hub_position.y }
      })
    ]

    if (this.state.expand) {
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
      
  }

 
    
    this.setState({nodes:nodes})
  }
    


    async componentDidMount()
  {
      
      await this.getNodes()
  }

  render() {    

    let context = {market: this.state.market, setMarket:this.state.setMarket}
    if (this.state.expand) {
    let nodes = this.state.nodes
    return  (
        <CommuneContext.Provider value={context}>   
          {nodes.length>0 && nodes}
        </CommuneContext.Provider>)
    } else {
      let nodes = this.state.nodes.slice(0,1)
      return (<CommuneContext.Provider value={context}>   
          {nodes.length>0 && nodes}
        </CommuneContext.Provider>)
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



