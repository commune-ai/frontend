import './App.css'

import { TreeRender, root } from "./tools/build/tree";
import { types } from './tools/customNode';
import { x } from './data/dataflow' //--Tester--
import ReactFlow, {Background, ReactFlowProvider, useNodesState, useEdgesState } from 'react-flow-renderer'
import React, { useState, useEffect } from 'react';
import CustomLine, { edgeTypes } from './tools/CustomLine';
import children_id from './tools/helpers';

function Flow() {
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

function App() {


  return (
    <div className="App">
      <ReactFlowProvider>
      <Flow/>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
