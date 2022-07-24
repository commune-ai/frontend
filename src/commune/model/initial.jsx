import React, { Component } from 'react'
import { Background } from 'react-flow-renderer'
import { Button, Grid,Image, Statistic, Header, GridRow, Segment, Input, Card } from 'semantic-ui-react'
import Plot from 'react-plotly.js';


export default class InitialContent extends Component {
  state = { log: [] }
  // constructor(props) {
  //   super(props)
  // }
  


  setTokenAmount = (value) => {
    this.setState((value)=> ({tokenAmount: value}) )
  }

  render() {
    // const { log } = this.state
    
    console.log(Object.keys(this.props.data.explain_map))
    console.log(this.state.explain, "explain")

    const data = this.props.data.explain_map.ROI
    return (
      <Grid columns={3} >
        <Grid.Row> 
        </Grid.Row>
          <Grid.Column style={{paddingRight:'3px'}} >
          <Button fluid size='huge' color='green' content={'BUY'}  circular />
          </Grid.Column>
          <Grid.Column>
          <Input labelPosition='right' type='number' size='huge' placeholder='Amount' fluid onChange={(e, {value}) => this.setTokenAmount(value)}>
          </Input>
          </Grid.Column>
          <Grid.Column style={{paddingLeft:'3px'}}>
            <Button fluid size='huge' color='red' content={'SELL'}  circular /> 
          </Grid.Column>

        <Grid.Row>
          <Grid.Column>
          <Statistic horizontal size={'medium'}  value={'0'} label={"Deposited Amount"} inverted/>
          </Grid.Column>
          <Grid.Column>
          <Statistic horizontal size={'medium'} value={'6%'} label={"Weekly ROI"} inverted/>
          </Grid.Column>
          <Grid.Column>
          <Statistic horizontal size={'medium'} value={'0'} label={"Commune Members"} inverted/>
          </Grid.Column>
        </Grid.Row>
            
      </Grid>
      

    )
  }
}
