import React, { Component } from 'react'
import { Background } from 'react-flow-renderer'
import { Button, Grid, Statistic, Dropdown, Divider,Menu,  Header, GridRow, Segment, Input } from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import './css/explainable.css';
import {randomColor} from '../../util/color'
import ExplainComponent from './explainable';


export default class ExplainBlockManagerComponent extends Component {
  state = { log: [] }
  constructor(props) {
    super(props)
    this.style = props.data.style

    let explain_block_keys = props.data.explain_blocks.map((e)=>(e.name))
    this.state = {explain_block_keys:explain_block_keys, 
                  explain_blocks: props.data.explain_blocks,
                  explain_block_key: explain_block_keys[0] 
                   }


    this.explain_color_map = {}
    for (let i=0; i<this.state.explain_block_keys.length; i++) {
        this.explain_color_map[this.state.explain_block_keys[i]]= randomColor()
    }
  }

  getExplainBlock = (explainBlockKey=null) => {

    let default_style = {position : 'absolute',
    borderRadius: 50,
    textAlign: "center",
    borderStyle : 'none',
    backgroundColor : 'black',
    overflow : "hidden",
    }
    let title_style = {
      top: "0%",
      left: "35%",
      position: 'absolute',
      fontSize: "50px",
      color: "white",
      fontFamily: "Copperplate",
      textAlign: "center"
    }

    let explainBlock = null;


    if (!explainBlockKey) {
      explainBlockKey = this.state['explain_block_key']
    }
    for (let i=0; i<this.state.explain_blocks.length; i++) {
      if (this.state.explain_blocks[i].name == explainBlockKey) {
        explainBlock = this.state.explain_blocks[i]
      }
    }

    

    let style = {...default_style, ...explainBlock.style}

    style['border']= `20px solid ${this.explain_color_map[explainBlockKey]}`


    

    console.log(style, this.style, explainBlock.style)
    
    style.height = Math.floor(this.style.height * style.height)
    style.width = Math.floor(this.style.width * style.width)
    return ( 
      <div style={style}>
      <ExplainComponent data={explainBlock}/>
      </div>
    )
  }



  getBlockExplainerMenu = (explainBlockKey=null) => {


    const menuItems = this.state.explain_block_keys.map((k)=>(<Menu.Item
      key={k}
      name={k}
      active={k==this.state['explain_block_key']}
      color={this.explain_color_map[k]}
      onClick={()=>(this.setState({'explain_block_key': k}))}
    />))
    

    return (
            <Menu inverted>
              {menuItems}
            </Menu>
        )
      }
  render() {
    // const { log } = this.state
    return (
    <div >
    {this.getBlockExplainerMenu()}
    {this.getExplainBlock()}
    </div>

    )
  }

  }
