import React from 'react';
import { getBezierPath } from 'react-flow-renderer';

export const edgeTypes = {
  custom: CustomEdge,
};

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}){

  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  //console.log(id.split("-"))
  
  return (
    <path
    id={id}
    style={style}
    className="react-flow__edge-path animate-FadeMeOut hover:stroke-Retro-light-blue"
    d={edgePath}
  />
  );
};
