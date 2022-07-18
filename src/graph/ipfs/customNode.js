import { Position, Handle } from "react-flow-renderer"
import { useState } from "react"
import '../css/dist/output.css'
export const types = {
    custom : CustomNode,
}
// blur-sm hover:blur-none 

const file_type = {
    "txt" : "bg-Matriax8C-white",
    "json": "bg-Matriax8C-yellow",
    "yaml" : "bg-Matriax8C-green",
    
} 

export function CustomNode({data}){
    const [clicked, setClicked] = useState(false)

    console.log(data)
    var css = data.children.length === 0 ? `w-[200px] h-[200px] px-1 py-1 border-black border-2 shadow-black shadow-lg rounded-md text-white ${file_type[data.label.type]} hover:bg-gradient-to-bl from-Retro-light-blue to-Retro-purple duration-300` : `w-[200px] h-[200px] px-1 py-1 border-black border-2 shadow-black shadow-lg rounded-md text-white bg-Retro-light-pink hover:bg-gradient-to-bl from-Retro-light-pink to-Retro-purple duration-300`
    return (
        <div className=" ">
        <div className={css}
             onClick={() => {setClicked(!clicked)}}>
            <Handle type='target' position={Position.Top} id="top"/>
            <div className={`text-center w-full h-full bg-neutral-800 border-black border-2 shadow-black shadow-inner`} >
                {data.label.id}
            </div>
            <Handle type='source' position={Position.Bottom} id="bottom"/>
        </div>
        </div>
    )
}