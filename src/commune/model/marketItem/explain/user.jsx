import React, { Component } from 'react'
import { Background } from 'react-flow-renderer'
import { Button, Grid, Statistic,Dimmer, Loader, Image, Header, GridRow, Segment, Input } from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import '../../../../css/marketItem.css';

import ExplainManager from '../../../../commune/model/explain/explainableManager'
import ComponentBlockMosaic from '../../../../commune/block/bundle/ComponentBlockMosaic'

import ComponentMenuBundle from '../../../../commune/block/bundle/ComponentMenuBundle'
import {getStruct} from '../../../../commune/utils/types/struct'
import {deepMapSet} from '../../../../commune/utils/types/map'
import ExplainableManager from '../../../../commune/model/explain/explainableManager';
import Loading from '../../../../commune/block/bundle/Loading'


let commune = null 

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

let title_style = {
  left: "30%",
  position: 'absolute',
  fontSize: "50px",
  color: "white",
  fontFamily: "Copperplate",
  textAlign: "center"
}



export default class ExplainUserState extends Component {
  constructor(props) {
    super(props)
    this.style = props.data.style
    this.explain_map = {}
    commune =  props.data.commune
    this.model = props.data.model
    this.state = {'user': this.props.data.user,
                  'portfolio': this.props.data.portfolio}

  
    console.log("USER CONSTRUCTOR", this.props.data.user)
  }

  expandSwitch() {
    this.setState({expand: !this.state['expand']})
  }





  explainROI() {


    let roi_percent = 100*(1-( this.state.user['depositValue']/(this.state.user['marketValue'])))
    let colors =[]; let roi_ratios={};
    let signal_color ="red"
    if (roi_percent>0) {
      roi_ratios = {"roi": Math.abs(roi_percent),
      "non-roi": 100-Math.abs(roi_percent)}
      signal_color = "green"
      colors = [signal_color, 'black']
    } else {
      roi_ratios = {"non-roi": 100-Math.abs(roi_percent),
      "roi": Math.abs(roi_percent)}
      signal_color= "red"
      colors = [ 'black', signal_color]
    }


    const data = [{
        values: Array.from(Object.values(roi_ratios)),
        labels: Array.from(Object.keys(roi_ratios)),
        domain: {column: 0},
        name: 'GHG Emissions',
        hoverinfo: 'label+percent+name',
        direction:"counterclockwise",
        sort: false,
        hole: 0.6,
        type: 'pie',
        textinfo: 'none',
        text: {font: {size:40}},
        marker: {colors: colors,
                line: {color:"white", width:10}},
        
      }]
    const layout = {
        annotations: [

          {
            font: {
              size: 60,
              color: "white"
            },
            showarrow: false,
            
            text: `My ROI`,
            x: 0.5,
            y: 0.3,
            
          
          },
          {
            font: {
              size: 80,
              color: "white"
            },
            showarrow: false,
            
            text: `${roi_percent}%`,
            x: 0.5,
            y: 0.5,
            
          
          }
        ],
        legend: {
          yanchor:"top",
          y:0.99,
          xanchor:"right",
          x: 0.01,
          font: {size:25}
        },
        showlegend: false,
        font: {color:"white", size: 40},
        margin: {t: 0, b: 0, l:0 , r:0}
      }
    
    return {data:data, layout:layout}

    }


    explainMarketShare() {
      let market_share_ratios = {"Your Deposit Value": this.state.user['marketShare'],
                        "The Other's Deposit Value": Math.max(100-this.state.user['marketShare'],0)}
      const data = [{
          values: Array.from(Object.values(market_share_ratios)),
          labels: Array.from(Object.keys(market_share_ratios)),
          domain: {column: 0},
          name: 'GHG Emissions',
          hoverinfo: 'label+percent+name',
          hole: 0.6,
          marker: {colors:["#01b3fab4", 'black'], line: {width:5, color:"white"}},
          type: 'pie',
          text: {font: {size:60}}
        }]
      
      const layout = {
          annotations: [
            
            {
              font: {
                size: 50,
                color: "white"
              },
              showarrow: false,
              text: `You Own`,
              x: 0.5,
              y: 0.7
            },
            
            {
              font: {
                size: 70,
                color: "white"
              },
              showarrow: false,
              
              text: `${(this.state.user.marketValue/(1000000000000000000)).toFixed(2)}`,
              x: 0.5,
              y: 0.5,
              
            
            },
            {
              font: {
                size: 40,
                color: "white"
              },
              showarrow: false,
              
              text: this.state.portfolio.baseTokenSymbol,
              x: 0.5,
              y: 0.3,
              
            
            }
          ],
          legend: {
            yanchor:"top",
            y:0.99,
            xanchor:"right",
            x: 0.01,
            font: {size:15}
          },
          showlegend: false,
          font: {color:"white", size: 40}
        }
      
      return {data:data, layout:layout}
  
      }
  


    generateExplainManager() {
    
      this.explain_map['ROI'] = this.explainROI() 
      this.explain_map['Market Share'] = this.explainMarketShare() 
      
      return <ExplainManager key="portfolio user" data={{style:this.style,
                                                          explain_map:this.explain_map}}/>

  }
  async componentDidMount() {
    this.generateExplainManager()
  }



  render() {
    

    return (<div>
      {(this.props.data.user)?  this.generateExplainManager():Loading("User Expalin") }) ;
      </div>)
}
}
