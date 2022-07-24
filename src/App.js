import './css/App.css'

import { ReactFlowProvider } from 'react-flow-renderer'
import Flow from './commune/graph/ipfs/flow'


export default function App() {


  return (
    <div className="App">
      <ReactFlowProvider>
      <Flow/>
      </ReactFlowProvider>
    </div>
  );
};