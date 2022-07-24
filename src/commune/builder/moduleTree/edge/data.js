import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';
import '../css/builder.css';
export default function DataEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  data,
  arrowHeadType,
  markerEndId,
}) {
  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  console.log(data, "EDGE DATA")
  style =  {stroke : " rgb(219, 205, 8)", fontColor: "white", strokeWidth : '10px'}
  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      
      <div className='handle-read'/>
      <text fontColor="rgb(219, 205, 8)">
        {data.text}
      </text>
    </>
  );
}