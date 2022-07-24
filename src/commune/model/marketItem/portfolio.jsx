import React, { Component } from 'react'
import ReactFlow, { Handle ,  Position} from 'react-flow-renderer'
import { Button, Grid, Statistic,Dimmer,Label,Divider, Icon, Loader, Image, Header, GridRow, Segment, Input } from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import '../../../css/marketItem.css';

import {randomColor, background_colors, getColor, default_colors} from '../../../util/color'

import {MarketContext, default_market_context} from '../../../commune/market/context'


import ComponentMenuBundle from '../../../commune/block/bundle/ComponentMenuBundle'
import {getStruct} from '../../../commune/utils/types/struct'
import {deepMapSet} from '../../../commune/utils/types/map'
import PortfolioExpand from './expand'
import StatisticBundle from '../../../commune/block/bundle/statisticBundle'
import ExplainUserState from './explain/user'
import ExplainPortfolioState from './explain/portfolio'
import Loading from '../../../commune/block/bundle/Loading';

import {default_model_context, ModelContext} from './context';

let commune = null 

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

export default class MarketItemPortfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: false,
      explain: false,
      user: default_model_context.user,
      portfolio: default_model_context.portfolio
    }
    commune =  props.data.commune
    this.model = props.data.model
    this.id = props.id
    this.user_address = null
  }




  expandSwitch() {
    this.setState({expand: !this.state['expand']})
  }


  async generateExplainMap() {
    const explain_map = {}
    this.explain_hash_list = (await this.model.getExplainers()).map((e)=>(getStruct(e)))

    for (const explain of this.explain_hash_list) {
      let explain_string_json = (await commune.backendAPI.get_ipfs_object(explain.uri));
      // explain_string_json = explain_string_json.replace("False", "false")
      explain_string_json = explain_string_json.replace(/'/g, '"')
      explain_string_json = replaceAll(explain_string_json, 'True', 'true')
      explain_string_json = replaceAll(explain_string_json, 'False', 'false')
      deepMapSet([explain.taxonomy, explain.name], JSON.parse(explain_string_json), explain_map )

    }
    this.explain_map = explain_map
    console.log(explain_map, "EXPLAIN")
    this.setState({explain:true}) 
  }



  
  generateExpansionComponent() {


    const style = {
      width: 1300,
      height:900,
      backgroundColor:"black",
      border: '10px solid black'
    
  }
    let component_map = {}

    if (this.explain_map){

      return <PortfolioExpand key={`expanded_portfolio-${this.state.updateNonce}`}
                    data= {{explain_map:this.explain_map,
                        style:style, 
                        model: this.model,
                        commune:commune,
                        updateNonce: this.state.updateNonce,
                        user: this.state.user, 
                        portfolio: this.state.portfolio}
                    } />
                    

    } else {
      return Loading("Loading", style)
    }
  }
  getPortfolioSummary() {
    let ownerCount = 0 
    let ROI = 0
    let marketValue = 0
    let baseTokenSymbol;

    if (this.state.portfolio) {
      ownerCount = this.state.portfolio.ownerCount
      ROI = (this.state.portfolio.ROI).toFixed(1)
      marketValue = (this.state.portfolio.marketValue * 10e-19).toFixed(1)
      baseTokenSymbol = this.state.portfolio.baseTokenSymbol
      
    }

    return  [
    <h1 id='card-title' style={{textAlign: "center", top: '5%', position: "absolute", fontSize:40, width: "100%"}} >{this.state.name}</h1>,

    <div className="statisticBundle-Portfolio">

    <Divider horizontal inverted style={{position: "absolute", top: "0%"}} >Portfolio</Divider>
    
    <Statistic.Group widths='3' style={{position:"absolute", top: "30%", width:"110%", left: '-6%'}}>
    
    <Statistic inverted color="orange" mini  inverted>
      <Statistic.Value >
        <Icon name='users' />{ownerCount}
      </Statistic.Value>
      <Statistic.Label style={{fontSize:20}}>users</Statistic.Label>
    </Statistic>

    
    <Statistic mini color={ROI<0?"red": "green" } inverted >
      

      <Statistic.Value  >{ROI}%</Statistic.Value>
      
      <Statistic.Label  style={{fontSize:25}} >ROI</Statistic.Label>
    </Statistic>
    <Statistic color="yellow" inverted mini style={{fontSize:30}} >
      <Statistic.Value >{marketValue} </Statistic.Value>
      <Statistic.Label  style={{fontSize:25}} >{baseTokenSymbol}</Statistic.Label>
    </Statistic>
    </Statistic.Group>

    </div>
    ]
    
  }




  getUserSummary() {

    let ROI = 0
    let marketValue = 0
    let baseTokenSymbol;

    if (this.state.portfolio) {
      baseTokenSymbol = this.state.portfolio.baseTokenSymbol
      
    }
    if (this.state.user) {
      ROI = (this.state.user.ROI).toFixed(2)
      marketValue = (this.state.user.marketValue * 10e-19).toFixed(2)
      
    }
  
      
  
      return <div className="statisticBundle-User">
  
        <Divider horizontal inverted style={{fontSize:20, position: "absolute", top: "0%"}} >User</Divider>
  
        <Statistic.Group widths='2' style={{position:"absolute", top: "30%", width:"100%"}} >
  
  
        <Statistic color={ROI<0?"red": "green" } inverted size='large' >
          
  
          <Statistic.Value >{ROI}%</Statistic.Value>
          
          <Statistic.Label  style={{fontSize:25}} >ROI</Statistic.Label>
        </Statistic>
        <Statistic  inverted size='large'>
          <Statistic.Value >{marketValue}</Statistic.Value>
          <Statistic.Label  style={{fontSize:25}} >Market Value</Statistic.Label>
        </Statistic>
        </Statistic.Group>
  
  
        </div>
  
  
  }

  metaLabels() {
    return (
    <Label.Group style={{bottom:"5%", left: "4%", position: "absolute", width: "100%"}}>
    <Label  color='red' size="small" style= {{fontSize: 20}}  image>
      Task
      <Label.Detail>Smart Swap</Label.Detail>
    </Label>

    <Label color='orange' size="small" style= {{fontSize: 20}}  image>
      Model
      <Label.Detail>NBEATS</Label.Detail>
    </Label>

    {/* <Label color='blue' size="massive" style= {{fontSize: 25}}  image>
      Creator
      <Label.Detail>Bob</Label.Detail>
    </Label> */}


    </Label.Group>) 


  }
  collapsedComponent() {



    const user_summary = this.getUserSummary()
    const portfolio_summary = this.getPortfolioSummary()
    const meta_labels = this.metaLabels()




    return (<div className="collapsedIntro" style={this.props.style} onDoubleClick={(e)=>(this.expandSwitch())}>
        
    {portfolio_summary}


    {meta_labels}
    </div>)

  }

  expandedComponent() {


    let ownerCount = 0 
    let ROI = 0
    let marketValue = 0
    let name = ""

    if (this.state.portfolio) {
      ownerCount = this.state.portfolio.ownerCount
      ROI = (this.state.portfolio.ROI).toFixed(1)
      marketValue = (this.state.portfolio.marketValue * 10e-19).toFixed(0)
      if (this.state.portfolio.name){
        name = this.state.portfolio.name

      }
    }

    const header = 

    <h1 id='card-title' style={{ textAlign: "center", fontSize:50}} >{`${name} Explainable`} </h1>


    let addStyle = {backgroundColor:getColor(this.id,background_colors)
                    }
    let actionComponents = this.generateActionComponent()
    
    

    let hello = (
      <MarketContext.Consumer>

      {({market, setMarket}) =>  {
        if (this.id != market.expand_id) {
          market.expand_id = this.id
          setMarket(market)
        }
        }}
      </MarketContext.Consumer>
    )
    return (

      
      
      <div className='expandedExplanationOuter'  style={{backgroundColor:getColor(this.id,background_colors), zIndex:'2'}}> 
      {header}
      <div className='expandedExplanation' onDoubleClick={(e)=>(this.expandSwitch())}>
        {this.generateExpansionComponent()}

      </div>
      {actionComponents}

      </div> 
      
      

        )
  }



    async withdraw(value) {
      // console.log(value , "bigint")
      // value = ethers.BigNumber.from(value)
      // await this.model.withdrawNFT(value)
      await this.updateState()
  
    }
    generateInputComponent(type="sell") {
      if (type=="buy") {
  
        let buyValue = "0"
  
        return (




          <Input size="massive" 
          fluid 
          style={{fontSize:35}}
          inverted fluid 
          placeholder='Buy Amount'
          defaultValue='0'
          onChange={e => {buyValue=e.target.value; console.log(buyValue, "BRUH")}}
           >

          <Button size="massive"
                    color="yellow" 
                    style={{fontSize:35}}
                    content='NAH'
                    onClick={()=>{this.setState({actionReady: null})}}
                    />

            <input/>

          <Button size="massive" style={{fontSize:35}} color="green" content='RIPPIT'
                   onClick={async ()=> { await this.deposit(buyValue)}}/>


          </Input>
        ) 
        }
      else if  (type == "sell") {
  
        let sellValue = "0"
  
        return (
          (
            <div>
              
              <Input size="massive" 
                    fluid 
                    style={{fontSize:35}}
                    inverted fluid 
                    placeholder='Amount'
                    defaultValue='0' 
                    onChange={e => {sellValue=e.target.value}}
                    >

              <Button size="massive" 
                      color="yellow"
                      style={{fontSize:35,fontColor: "black"}}
                     content='NAH'
                     onClick={()=>{this.setState({actionReady: null})}}
                      />
              <input/>
              <Button size="massive" style={{fontSize:35}} color="red" content='RIPPIT' 
                   onClick={async ()=> {await this.withdraw(sellValue)}}/>
                   
              </Input>
  
            </div>
          )
        )
      }
  
    }
    async checkUserAccount() {
      let current_user_address = await (commune.signer()).getAddress()
      if (current_user_address != this.user_address)
        {
         
          this.user_address = current_user_address
          await this.updateUserState()
        }
        
    }
    async updateState() {
      await this.model.connect(commune.signer())
      await this.updateUserState();
      await this.updatePortfolioState();
    }

    async updatePortfolioState() {
      

      console.log("UPDATE STATE PORTFOLIO")

      if (!this.nft){
        const nftAddress = await this.model.nft()
        this.nft = await commune.getContractFromAddress("DepositNFT", nftAddress)
      }
  
     const nftState = getStruct(await this.nft.state())
     
      let portfolio = {...getStruct(await this.model.state()),...nftState}
      
      portfolio['tokens'] = await this.model.getTokens()
      portfolio['name'] = await this.model.name()
      // console.log(await this.model.getTokens(),"TOKENS")
      
      portfolio['percentBase'] = await this.model.percentBase()
      portfolio['tokenStates']= {}
      portfolio['ROI'] = ((portfolio['marketValue']/portfolio['depositValue'])-1)*100
      for (const tokenSymbol of portfolio['tokens']) {
        portfolio['tokenStates'][tokenSymbol] = getStruct(await this.model.tokenStates(tokenSymbol))
      }

      this.setState({portfolio: portfolio})
    }

    async updateUserState() {

      let user = {}
      user['depositValue'] = Number(await this.model.getUserDepositValue())+1E-10
      user['marketValue'] = Number(await this.model.getUserMarketValue())+1E-10
      user['address'] = await this.model.signer.getAddress()
      user['ROI'] = (((user['marketValue'])/(user['depositValue'])-1)*100)
      
      // portfolio['tokenStateHistory'] = await this.model.getTokenStateHistory()
      user['marketShare'] = Math.min(user['marketValue']/this.state.portfolio['marketValue'],1.0)*100
      user['depositShare'] = Math.min(user['depositValue']/this.state.portfolio['depositValue'], 1.0)*100
  
      this.setState({user:user})
      this.setState({updateNonce:this.state.updateNonce+1})

      if (!this.state.name) {
        this.setState({name: await this.model.name()})
      }

      await this.generateExplainMap()
  
    }
    
  
    generateActionComponent() {
  
      let actionComponents = []
      if (this.state.actionReady) {
        actionComponents.push(this.generateInputComponent(this.state.actionReady))
      } else {
  
        actionComponents.push(<Button size='massive' color='red' style={{fontSize:40, width:"48%"}} content={'DUMP IT'}
        onClick={()=>{this.setState({actionReady: "sell"})}} /> )
        actionComponents.push(<Button size='massive' color='green' style={{fontSize:40, width:"48%"}} content={'YOLO'}
        onClick={()=>{this.setState({actionReady: "buy"})}} /> )
      }
  
      return (

        <div style={{position:"absolute", bottom:"0%", left:"5%", width: "90%"}}>
        {actionComponents}
        </div>
      )
    }
    generateStatisticComponents() {
      const stats = this.state.stats
      return (<StatisticBundle stats={stats}/>)
    }
    generateComponentMap()  {
        let component_map = {}
        const timestamp = Math.floor(Date.now() / 1000)    
        component_map['Portfolio']= <ExplainPortfolioState key={`user ${this.state.updateNonce}` } 
        data={{model: this.model, 
               commune:commune, 
               style:this.style,
               portfolio:this.state.portfolio,
               user:this.state.user}}/>
  
        component_map['User'] = <ExplainUserState key={`user ` } 
                                                 data={{model: this.model, 
                                                        commune:commune, 
                                                        style:this.style,
                                                        portfolio:this.state.portfolio,
                                                        user:this.state.user}}/>
  
        const intro_key =  `intro components`
  
        return <ComponentMenuBundle key={intro_key} data = {{component_map: component_map}}/>
  
    }
    async componentDidMount()
    {
      await this.updateState()
      setInterval(async ()=>{await this.updateUserState()},2000)
        
    }
    render() {

      
        if (this.state['expand']) {

          return this.expandedComponent()
        } else {
          return this.collapsedComponent()
        }
        
    
    
  

}
}
