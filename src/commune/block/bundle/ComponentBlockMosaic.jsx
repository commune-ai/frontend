import React, { Component } from 'react'
import { Background } from 'react-flow-renderer'
import { Button, Grid, Statistic, Header, GridRow, Segment, Input } from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import '../../css/portfolio.css';

   
let default_style = {position : 'absolute',
borderRadius: 50,
textAlign: "center",
borderStyle : 'none',
backgroundColor : 'black',
border: '20px solid #D63C2F',
overflow : "hidden",
}

export default class ComponentBlockMosaic extends Component {
  constructor(props) {
    super(props)

    this.style = props.data.style
    this.name = this.props.data.name
    this.block = {}
    this.style = this.props.data.style
    this.blocks  = this.props.data.blocks
  }

  generate_component_blocks() {


    // Left Explain Block

    // const columns_in_current_row = Math.min(array.length-columns_per_row*row_index, columns_per_row) 
    
    let component_blocks = []
    for (let block of this.blocks) {
      let style = {...default_style, ...block.style}

      style.width =  Math.floor(this.style.width*block.style.width)
      style.height = Math.floor(this.style.height*block.style.height)
      
      block.data['style'] = {...style}

      component_blocks.push(<div style={style}>
      {<block.component data={block.data}/> }
      </div>)
      
  }
  return component_blocks
}
  render() {
    // const { log } = this.state

    let component_blocks = this.generate_component_blocks()

    const style = this.props.data.style
    
    return(
      <div className='explainable-node' style={style} >
        {component_blocks} 
      </div>
    );
  }
}
