import React, { Component } from 'react'
import { Background } from 'react-flow-renderer'
import { Button, Grid, Statistic, Dropdown, Divider,Menu,  Header, GridRow, Segment, Input } from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import './css/explainable.css';

import {randomColor} from '../../../util/color'

export default class Explainable extends Component {
  constructor(props) {
    super(props)
    this.state['data'] = props.data
    const default_layout = {autosize:true, paper_bgcolor: "rgba(0,0,0,0)",  plot_bgcolor:"rgba(0,0,0,0)"}
    this.state['layout'] = {...default_layout, ...props.layout} 
  }
  
  render() {
    // const { log } = this.state
    return <div><Plot data= {this.state.data} layout={this.state.layout}/></div>
  }

  }
