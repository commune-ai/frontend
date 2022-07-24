import React, { Component } from 'react'
import { Background } from 'react-flow-renderer'
import { Button, Grid, Statistic, Dropdown, Divider,Menu,  Header, GridRow, Segment, Input } from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import {randomColor} from '../../../util/color'

export default class ComponentMenuBundle extends Component {
  state = { log: [] }
  constructor(props) {
    super(props)
    this.component_map = props.data.component_map
    this.style = props.data.style
    this.component_keys = [...Object.keys(this.component_map)]
    this.state['component_key'] = this.component_keys[0]
    this.component_color_map = {}

    if (props.menuStyle) {
      this.menuStyle = props.menuStyle
    } else {
      this.menuStyle = {fontSize:35, fontWeight: "900"}
    }

    
    for (let i=0; i<this.component_keys.length; i++) {
        this.component_color_map[this.component_keys[i]]= randomColor()
    }
  }
  
  changeComponent = (component_key) => {
    
    this.setState(() => ({ component_key: component_key }))
    }

  getComponentMenu = () => {
    const menuItems = this.component_keys.map((k)=>(<Menu.Item
      key={k}
      inverted
      name={k.toUpperCase()}
      style={this.menuStyle}
      active={k==this.state['component_key']}
      color={this.component_color_map[k]}
      onClick={()=>(this.setState({'component_key': k}))}

    />))
    
    return (
            <Menu fluid inverted size="massive" widths={this.component_keys.length}>
              {menuItems}
            </Menu>
        )
      }


  render() {
    let menu_components = this.getComponentMenu()

    let component_obj = this.component_map[this.state['component_key']]

    return (
      (
      this.style? 
      <div style={this.style}>
        {menu_components} 
        {component_obj}  
      </div>
      : 
      <div>
        {menu_components} 
        {component_obj}  
      </div>
      )
    )
  }

  }
