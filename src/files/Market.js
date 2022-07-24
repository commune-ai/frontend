
import './App.css';
import './market.css';
import React, { useState, Component } from 'react';
import ReactFlow, {
       MiniMap,
       Handle,
       Position,
       Background      } from 'react-flow-renderer';
import CustomEdge from './util/CustomEdge';

import ExplainComponent from './model/explain/explainable'
import ExplainBlockManger from './model/explain/manager'
import {PortfolioExplainManagerComponent, PortfolioInfoComponent} from './model/explain/portfolio'

import InitialContent from './model/initial'
import { Card, Image, Segment, Tab, Grid, Placeholder, Button, Icon, Header } from 'semantic-ui-react';
const config = require('./files/mongo_v2.json')



// TESTING NODE ******************************************

let explainBlockData = [ { name: "Category 1",
explain_map:  {
                "Plot 1": {data: [{x: [1, 2, 3],y: [2, 6, 3],type: 'scatter',mode: 'lines+markers',marker: {color: 'red'}}]},
                'Plot 2':{data: [{type: 'bar', x: [1, 2, 3], y: [2, 5, 3]}]}
              }
}]

let explainBlockManagerData = 
    {
    name: "ExplainBlockManager",
    style: {
      width: 1200,
      height: 600
    },
  
    explain_blocks : explainBlockData
}


let portfolioData= {
          name: "Portfolio Explainble",    
          style: {
            width: 1200,
            height:800,
            backgroundColor:"black"
          }
        }
let value = [
    {
      id: 'Model 1',
      type: 'explain', // input node
      data: {explain: explainBlockManagerData, 
            portfolio: portfolioData},
      position: { x: 50, y: 150 }
    }
    ];
//********************************************************
const MarketItemNode = ({data}) => {
  
    const [expandable, setExpandable] = useState(false);
    //var layout = { paper_bgcolor: "rgba(0, 0, 0, 0)", color : "#fff", marginTop : '350px', };
    return(
      <div className='env'>
      <div className={expandable ? 'explainable-node' : 'collapsed--node'} onDoubleClick={(e) => {setExpandable(expandable ? false : true)}}>
        <h1 id='card-title' >Process Uno</h1>
        {expandable && 
        <div className='bt-explain-contain'>
        <ExplainComponent data={data}/>
        </div>
        }

      <InitialContent data={data}/>
      </div>
      
      </div>

    );
  };




const ExplainNode = ({data}) => {
      //var layout = { paper_bgcolor: "rgba(0, 0, 0, 0)", color : "#fff", marginTop : '350px', };
    
    let explainData = data.explain.explain_blocks[0]
    let portfolioData = data.portfolio
    
    explainData['style'] = { width: portfolioData['style']['width']*0.6*0.95, 
                             height:(portfolioData['style']['height']*0.82)*0.75
                            }
   
    portfolioData['explain_blocks'] = [
        {name: "Explain", style: { width: 0.60, height: 0.82, top:"10%", left:"2%",  border: '10px solid lime'}, 
                component: ExplainComponent,
                data: explainData},
                
        {
          name: "Info", style: { width: 0.30, height: 0.82, top:"10%", left:"66%",  border: '10px solid yellow'}, 
        component: PortfolioInfoComponent,
        data: {}
      }
      ]
  

    return <PortfolioExplainManagerComponent data={portfolioData}/>
  };



const nodeTypes = {
    marketItem : MarketItemNode,
    explain: ExplainNode
};
const edgeType ={
  custom : CustomEdge
}


function Market() {
        return (
        <div className='env'>
          <ReactFlow elements={value} style={{ background: 'black' }} nodeTypes={nodeTypes} edgeTypes={edgeType}> 
          <Background
            variant="dots"
            color="black"
            gap={12}
            size={1}
          />
          </ReactFlow>
        </div>
        );
}
      
      //export default () => 
      
export default Market;
