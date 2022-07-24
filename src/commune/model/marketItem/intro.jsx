/* global BigInt */

import React, { Component } from 'react'
import { Background } from 'react-flow-renderer'
import { Button, Grid,Dropdown,Dimmer, Loader, Image, Statistic, Divider,  Header, GridRow, Segment, Input } from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import '../../css/info.css';
import {randomColor, background_colors} from '../../util/color'

import ComponentMenuBundle from '../../commune/block/ComponentMenuBundle'
import ExplainManager from '../explain/explainableManager';
import StatisticBundle from '../../commune/block/statisticBundle'
import ExplainUserState from './explain/user'
import ExplainPortfolioState from './explain/portfolio'
import {ethers} from 'ethers';
import {getStruct} from '../../commune/utils/types/struct'


let commune ;
const LoaderExampleIndeterminate = (loading_message) => (
  <div>
    <Segment>
      <Dimmer active>
        <Loader indeterminate>{loading_message}</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>
  </div>
)



export default class PortfolioIntro extends Component {
  constructor(props) {
    super(props)

    this.model = props.data.model
    commune = props.data.commune
    this.style = props.data.style
    this.state = {
      actionReady: null,
      buyValue: '0',
      sellValue:'0',
      updateNonce: this.props.data.updateNonce,
      user: this.props.data.user,
      portfolio: this.props.data.portfolio
    }
    
  }




  generateComponentMap()  {
      let component_map = {}
      component_map['Portfolio']= <ExplainPortfolioState key={`portfolio ${this.state.updateNonce}` } 
                                data={{model: this.model, 
                                      commune:commune, 
                                      style:this.style,
                                      portfolio:this.state.portfolio,
                                      user:this.state.user}}/>
        
      console.log("FUCK", this.state)

      component_map['Me'] = <ExplainUserState key={`user ${this.state.updateNonce}` } 
                                               data={{model: this.model, 
                                                      commune:commune, 
                                                      style:this.style,
                                                      portfolio:this.state.portfolio,
                                                      user:this.state.user}}/>

      const intro_key =  `intro components ${this.state.updateNonce}`

      return <ComponentMenuBundle key={intro_key} data = {{component_map: component_map}} style={this.style}/>

  }
  render() {
    
    // const { log } = this.state

    this.explain_map =  this.props.data.explain_map

    
    return ((this.explain_map)? 
        this.generateComponentMap():
        LoaderExampleIndeterminate('Portfolio')
    )
  }
}
