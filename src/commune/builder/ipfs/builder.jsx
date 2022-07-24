
// import './css/builder.css';
// // import Logo from'./logo.png';
// import React, { useState, Component , useEffect} from 'react';

// // import ReactJson from 'react-json-view'
// import DataEdge from './edge/data.js'
// import ReactFlow, {
//   addEdge,
//   Handle, 
//   Position,
//   MiniMap,
//   Controls,
//   Background,
//       } from 'react-flow-renderer';
// // import Hexagon from 'react-hexagon';
// import {manager as communeManager} from "../..";
// import ProcessNode from "./node/process"
// import Draggable from 'react-draggable';
// import {packBlocks, equidistantCircleNodes} from '../../../util/nodeFormations'
// import {ModuleTreeContext} from './context'
// //********************************************************

// import { TreeRender, root } from "./tools/build/tree";
// import { types } from './customNode';
// import { x } from './data/dataflow' //--Tester--
// import ReactFlow, {Background, ReactFlowProvider, useNodesState, useEdgesState } from 'react-flow-renderer'
// import React, { useState, useEffect } from 'react';
// import CustomLine, { edgeTypes } from './CustomLine';
// import children_id from './tools/helpers';




// var commune = null


// export default class IPFSBuilder extends Component {



//     onNodeClick = (event, node) => {
//     setChildren(children_id(node)) 
//       }
//   constructor(props)  {
//     super(props) 
//     // General
//     commune = this.props.commune
//     this.state = {
//       children = {}
//     }
//     let rendered = new TreeRender(x)
//     const data = rendered.flatten(rendered.nodeRoot)
//     const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes);
//     const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);
  
//       useEffect(() => { 
//         setNodes((nds) =>
//           nds.map((node) => {
//             if (node.id in children) {
  
//               node.hidden = children[node.id].hidden;
//             }
    
//             return node;
//           })
//         );
//         setEdges((eds) =>
//           eds.map((edge) => {
//             if (edge.source in children || edge.target in children) {
//               edge.hidden = children[edge.target].hidden 
//             }
    
//             return edge;
//           })
//         );
//       }, [children, setNodes, setEdges]);


//     // resizes the window every time you resize the window

//   }

//   getModuleTree = () => {
//     commune.api.moduleTree().then((moduleTree)=> { 
//                                     console.log('DEBUG', moduleTree)
//                                     this.setState({moduleTree: moduleTree})
//                                   })
//     }

//   getNodes= () => {
//     let nodes = []
//     let i = 0

//     let center_point = {x: window.innerWidth*0.5, y:window.innerHeight*0.5 }



//     let block_style_array = packBlocks({
//                                         center_point: center_point, 
//                                         blocks:Object.keys(this.state.moduleTree).length ,
//                                         parentDims:{width: window.innerWidth, height:window.innerHeight},
//                                         // padding : {height: [0.0,0.0], width: [0.0,0.0]},
//                                         margin : {height:0.1, width:0.1}})
//     // let block_style_array = equidistantCircleNodes({center_point: center_point, 
//     //                                                        blocks:Object.keys(this.state.moduleTree).length ,
//     //                                                        inner_radius_factor: 0.5, 
//     //                                                        radius: Math.min(window.innerWidth,window.innerHeight)*0.4})
//     let expand_node ;
//     for (const [i, [module_key, module_node]] of Object.entries(this.state.moduleTree).entries()) {
      
//       let node_style = block_style_array[i]

//       let current_node = {
//         id: module_key,
//         key: module_key ,
//         type: 'process',
//         position: { x: node_style.left , y: node_style.top  },
  
//         style: {width: node_style.width, height: node_style.height}, 
//         data: {cfg: module_node, 
//               expand_style: this.expand_style,
//               name: module_key ,
//               expand: this.state.expand,
//               style: {width: node_style.width, height: node_style.height},
//               commune: commune }
//       }
//       if (this.state.expand == module_key){
//         current_node.id = module_key + '_expand'
//         current_node.key = module_key
//         current_node.data.style = this.expand_style
//         current_node.style = this.expand_style
//         current_node.position= {x: center_point.x-(this.expand_style.width*0.5), y:center_point.y-(this.expand_style.height*0.5) }
//         expand_node = current_node

       
//       }

//       else {
//         nodes.push(current_node)
//       }
//       }

//       if (expand_node) {
//         nodes.push(expand_node)
//       }


    
//     return nodes
//   }



//     getGraph = () => {
//       this.nodes = this.getNodes()
//       // const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
//       return (
//         <ReactFlow
//           nodes={this.nodes}
//           //onConnect={onConnect}
//           nodeTypes={this.nodeTypes}
//         >
//         </ReactFlow>
//       );
//     };
  
//   setExpand = (module_key) => {
//     if (this.state.expand  && this.state.expand == module_key)
//     {

//       this.setState({expand: null })
//     } else {
//       this.setState({expand: module_key })
//     }


//   }

//   render() {    


//     if (this.state.moduleTree) {
      
//       return (<ModuleTreeContext.Provider value={{state: this.state,  setExpand: this.setExpand}}>
//          {this.getGraph()}
//          </ModuleTreeContext.Provider>)
      
//     } else 
//     return (<div></div>)
//     }

//   componentDidMount = () => {
//     this.getModuleTree()
//     window.addEventListener('resize', this.setWindowDimensions)

//   }

//   setWindowDimensions = () => {
//     this.setState({window: {height: window.innerHeight,
//       length: window.innerWidth}})
//   }



//  componentDidUpdate()
//  {
 
   
//  }
// }




import './css/App.css'


import { TreeRender, root } from "./tools/build/tree";
import { types } from './customNode';
import { x } from './data/dataflow' //--Tester--
import ReactFlow, {Background, ReactFlowProvider, useNodesState, useEdgesState } from 'react-flow-renderer'
import React, { useState, useEffect } from 'react';
import CustomLine, { edgeTypes } from './CustomLine';
import children_id from './tools/helpers';



export function IPFSTreeBuilder() {
  let rendered = new TreeRender(x)
  const data = rendered.flatten(rendered.nodeRoot)
  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);
  const [children, setChildren] = useState({})
  const onNodeClick = (event, node) => {
    setChildren(children_id(node)) 
    }

    useEffect(() => { 
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id in children) {

            node.hidden = children[node.id].hidden;
          }
  
          return node;
        })
      );
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.source in children || edge.target in children) {
            edge.hidden = children[edge.target].hidden 
          }
  
          return edge;
        })
      );
    }, [children, setNodes, setEdges]);


  //const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


  return ( <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onNodeClick={onNodeClick}
    connectionLineComponent={CustomLine}
    nodeTypes={types}
    edgeTypes={edgeTypes}
    fitView>
      <Background className=' bg-zinc-800' variant="dots" size={2} />
    </ReactFlow>)
}


