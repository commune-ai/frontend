
import React, { useState, useContext } from 'react';
import "../../../css/global.css";

enum EndpointEnum {
    WS="ws",
    HTTP="http",
    GRPC= "grpc"
}

interface Space {
    index : number;
    namespace : string;
    lasUpdated : string;
    endpoint : EndpointEnum;
    host : string;
    port : string | number;
    network : string
    description : string
    tags : string
}

export default function Space({index, namespace, lasUpdated, endpoint, host, port, network, description, tags} : Space){
    
    

    return (<div key={`_${namespace}_${index}_${network}`} 
                 className='px-5 h-20 w-full py-2 dark:bg-gray-700 bg-slate-100 rounded-lg shadow-md hover:shadow-lg'>
                <div id={"namespace_token"} className=' font-medium flex'>
                    <div className=' mt-[2px] mr-1 '>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className=' my-auto flex flex-col'>
                        <div>{namespace}</div>
                        <div className=' text-sm'>{tags}•{lasUpdated}</div>
                    </div>
                </div>

            </div>)
}