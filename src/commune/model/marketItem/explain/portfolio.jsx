import React, { Component } from 'react'
import { Background } from 'react-flow-renderer'
import { Button, Grid, Statistic,Dimmer, Loader, Image, Header, GridRow, Segment, Input } from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import '../../../css/marketItem.css';

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


export default class ExplainPortfolioState extends Component {
  constructor(props) {
    super(props)
    this.style = props.data.style
    this.explain_map = {}
    commune =  props.data.commune
    this.model = props.data.model
    this.state = {'user': this.props.data.user,
                  'portfolio': this.props.data.portfolio}
  }

  expandSwitch() {
    this.setState({expand: !this.state['expand']})
  }

  explainROI() {
    let roi_percent = Number((100*(1-( this.state.portfolio['depositValue']/(this.state.portfolio['marketValue'])))).toFixed(2))
   
    let colors =[]; let roi_ratios={};
    let signal_color;
    if (roi_percent>0) {
      roi_ratios = {"roi": Math.abs(roi_percent),
      "non-roi": 100-Math.abs(roi_percent)}
      signal_color = "rgba(10, 216, 54, 0.781)"

      colors = [signal_color, 'black']
    } else {
      roi_ratios = {"non-roi": 100-Math.abs(roi_percent),
      "roi": Math.abs(roi_percent)}
      signal_color= "rgba(230, 11, 11, 0.781)"

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
                line: {color:signal_color, width:10}},
        
      }]
    const layout = {
        annotations: [
          
          {
            font: {
              size: 40,
              color: "white"
            },
            showarrow: false,
            
            text: `Portfolio ROI`,
            x: 0.5,
            y: 0.4,
            
          
          },

          {
            font: {
              size: 60,
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


  explainTokenRatios() {
      let market_share_ratios = {"Your Deposit Value": this.state.user['marketShare'],
                        "The Other's Deposit Value": Math.max(100-this.state.user['marketShare'],0)}

      let token_ratios = {}
      for (const [tokenSymbol, tokenState] of Object.entries(this.state.portfolio.tokenStates)) {
        token_ratios[tokenSymbol] = tokenState.ratio/this.state.portfolio.percentBase
      }
      const data = [{
          values: Array.from(Object.values(token_ratios)),
          labels: Array.from(Object.keys(token_ratios)),
          domain: {column: 0},
          name: 'GHG Emissions',
          hoverinfo: 'label+percent+name',
          hole: 0.6,
          type: 'pie',
          text: {font: {size:40}}
        }]
      const layout = {
          annotations: [
            
            {
              font: {
                size: 30,
                color: "white"
              },
              showarrow: false,
              text: `Total Value`,
              x: 0.5,
              y: 0.7
            },
            
            {
              font: {
                size: 50,
                color: "white"
              },
              showarrow: false,
              
              text: `${(this.state.portfolio.marketValue/(1000000000000000000)).toFixed(2)}`,
              x: 0.5,
              y: 0.5    
            
            },
            {
              font: {
                size: 25,
                color: "white"
              },
              showarrow: false,
              
              text: `ETH`,
              x: 0.5,
              y: 0.3,
              
            
            }
          ],
          legend: {
            yanchor:"top",
            y:0.99,
            xanchor:"right",
            x: 0.01,
            font: {size:30}
          },
          showlegend: true,
          font: {color:"white", size: 40}
        }
      
      return {data:data, layout:layout}
  
      }
  


    generateExplainManager() {
    

      this.explain_map['Token Ratios'] = this.explainTokenRatios() 
      this.explain_map['ROI'] = this.explainROI() 
      
      return <ExplainManager key="portfolio user" data={{style:this.style,
                                                          explain_map:this.explain_map}}/>

  }
  // async componentDidMount() {
  //   await this.updateState()
  // }



  render() {
    

    return (<div>
      {(this.props.data.user)?  this.generateExplainManager():Loading("User Expalin") }) ;
      </div>)
}
}
