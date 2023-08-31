
import React, { useState, useContext } from 'react';
import '../../../css/global.css';
import { SpaceContext } from '../../../context/spaceContext';
import Space from '../space';

enum EndpointEnum {
    WS="ws",
    HTTP="http",
    GRPC= "grpc"
}

const dummyData = [
    {
        "namespace" : "fam::openAI::API_KEY",
        "type" : "api",
        "endpoint" : EndpointEnum.WS,
        "host" : "0.0.0.0",
        "port" : "51010",
        "network" : "commune",
        "description" : "we do things",
        "tags" : "ML"
    },
    {
        "namespace" : "fam::stableDiffusion::2.0",
        "type" : "model",
        "endpoint" : EndpointEnum.HTTP,
        "host" : "0.0.0.0",
        "port" : "510543",
        "network" : "commune",
        "description" : "we do things 2.0",
        "tags" : "text-to-image"
    },
    {
        "namespace" : "fam::stableDiffusion::3.0",
        "type" : "model",
        "endpoint" : EndpointEnum.HTTP,
        "host" : "0.0.0.0",
        "port" : "510543",
        "network" : "commune",
        "description" : "we do things 2.0",
        "tags" : "text-to-image"
    },
    {
        "namespace" : "fam::stableDiffusion::4.0",
        "type" : "model",
        "endpoint" : EndpointEnum.HTTP,
        "host" : "0.0.0.0",
        "port" : "510543",
        "network" : "commune",
        "description" : "we do things 2.0",
        "tags" : "text-to-image"
    },
    {
        "namespace" : "fam::stableDiffusion::5.0",
        "type" : "model",
        "endpoint" : EndpointEnum.HTTP,
        "host" : "0.0.0.0",
        "port" : "510543",
        "network" : "commune",
        "description" : "we do things 2.0",
        "tags" : "text-to-image"
    }
]

export default function SpaceContainer(){

    const {spaces, index, setIndex} = useContext(SpaceContext);
    console.log(index)
    return (<div className='flex flex-row'>

    <div className='h-screen w-[350px] bg-slate-300 shadow-2xl'>
J
    </div>
    <div className='flex flex-col space-x-1 space-y-10 w-full p-10'>
        {dummyData.map( (space, i) => {
            return (<Space index={i}
                           namespace={space.namespace}
                           lasUpdated='yesterday'
                           endpoint={space.endpoint}
                           host={space.host}
                           port={space.port}
                           network={space.network}
                           description={space.description}
                           tags={space.tags}/>)
       })}
    </div>        

    </div>)
}