import React, { Component } from 'react'
import { Background } from 'react-flow-renderer'
import { Button, Grid, Statistic, Dropdown, Divider,Menu,  Header, GridRow, Segment, Input } from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import './css/explainable.css';
import {randomColor} from '../../../util/color'
import Explainable from './explainable'


export default class ExplainableManager extends Component {
  state = { log: [] }
  constructor(props) {
    super(props)
    if (props.menuStyle) {
      this.menuStyle = props.menuStyle
    } else {
      this.menuStyle = {fontSize:25, fontWeight: "900"}
    }
   
    this.initialize()

  }
  
  initialize() {
    this.explain_keys = [...Object.keys(this.props.data.explain_map)]
    this.explain_map = this.props.data.explain_map


    this.state['explain_key'] = this.explain_keys[0]
    this.explain_color_map = {}
    
    for (let i=0; i<this.explain_keys.length; i++) {

        this.explain_color_map[this.explain_keys[i]]= randomColor()
    }
  }
  changeExplain = (explainKey) => {
    
    this.setState(() => ({ explain: this.explain_map[explainKey] }))
    console.log(explainKey, this.state.explain)
    }

  setTokenAmount = (value) => {
    this.setState((value)=> ({tokenAmount: value}) )
  }

  generateExplainerDropdown() {

    const explainerOptions = this.explain_keys.map((e)=>({key: e, text: e, value:e}))
    const changeExplainer = (e, {key, text, value}) => (this.setState({'explain_key': value}))
    return (<div>
                
      <Dropdown  size="huge"
      placeholder=''
      selection
      defaultValue = {explainerOptions[0].value}
      options={explainerOptions}
      onChange={changeExplainer}
      />
      </div>)
  }


  getBlockExplainerMenu = () => {

    const menuItems = this.explain_keys.map((k)=>(<Menu.Item
      key={k}
      name={k.toUpperCase()}
      
      style={this.menuStyle}
      active={k==this.state['explain_key']}
      color={this.explain_color_map[k]}
      onClick={()=>(this.setState({'explain_key': k}))}
    />))
    
    return (
            <Menu fluid inverted size="massive" widths={this.explain_keys.length}>
              {menuItems}
            </Menu>
        )
      }

  generateExplainableButtons() {
    let button_components = []
    for (let i=0; i<this.explain_keys.length; i++) {
      
      let explain_key = this.explain_keys[i]
      let color = this.explain_color_map[explain_key]
      button_components.push(
        <Button inverted color={color} size="massive"  basic onClick={()=>this.setState({'explain_key': explain_key})}> {explain_key}</Button>
        )
    }
    console.log(button_components)
    return button_components
  }

  render() {
    // const { log } = this.state


    
    
    const data = this.explain_map[this.state['explain_key']].data
    let layout = this.explain_map[this.state['explain_key']].layout

    let style = this.props.data.style
    const style_layout = {
      width:style.width*0.95, 
      height: style.height*0.8, 
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor:"rgba(0,0,0,0)",
      margin: {t: 0, b: 0, l:0 , r:0},
      font: {color:"white", size: 20} 
    }

    layout = {...layout, ...style_layout}
    
    let menu_components = this.getBlockExplainerMenu()
    style={}
    return (
      style ? 
      <div style = {style}>
        {menu_components} 
        <Divider></Divider>
        <Plot data= {data} layout={layout}/>
      </div>:
      <div>
      {menu_components} 
      <Divider></Divider>
      <Plot data= {data} layout={layout}/>
    </div>



    )
  }

  }
