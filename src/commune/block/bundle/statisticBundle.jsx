import React, { Component } from 'react'
import { Background } from 'react-flow-renderer'
import { Button, Grid,Dropdown, Statistic, Divider,  Header, GridRow, Segment, Input } from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import '../../css/info.css';
import {randomColor} from '../../../util/color'


function generateStatistic(label,value, color=null
, ) {
  if (!color) {
    color = randomColor()
  }
  return (
  <div class={`ui ${color} inverted statistic huge`}>
      <div class="value">
        {value}
      </div>
      <div class="label">
        {label}
      </div>
    </div>)
}

export default class StatisticBundle extends Component {
  state = { log: [] }
  constructor(props) {
    super(props)
    this.stats = props.stats
    this.stat_color_map = {}

    if (!props.color_map) {
      for (const stat_label in this.stats) {
        this.stat_color_map[stat_label] = randomColor()
      }
      
    }

    
  }



  generateStatisticComponents() {
    const stats = this.stats
    let title_style = {
      top: "0%",
      left: "40%",
      position: 'absolute',
      fontSize: "60px",
      color: "white",
      fontFamily: "Copperplate",
      textAlign: "center"
    }

    let statistics_list = []

    for (const [stat_label, stat_value] of Object.entries(this.stats)) {
      
      const stat_color = this.stat_color_map[stat_label]
      
      statistics_list.push(generateStatistic(stat_label, stat_value, stat_color))
    }
    
    return  (<div class="ui inverted segment centered">
    {statistics_list}
    </div>)
  }




  

  render() {
    
    // const { log } = this.state
    
    let statsComponents = this.generateStatisticComponents()
    return (
      <div>
        {statsComponents}
      </div>

    )
  }
}
