"use client"

import { LuGithub } from "react-icons/lu";
import { BiFile } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { FaBalanceScale } from "react-icons/fa";
import { TiMediaPlayOutline } from "react-icons/ti";
import { useEffect } from "react";

type ItemDetailType = {
    model_owner: string;
    model_name: string;
}

const ItemDetail = ({model_owner, model_name}:  ItemDetailType) => {

   const fetchData = async () => {
        const params = {
            model_owner:model_owner,
            model_name: model_name,
        };
        
        const res = await fetch(`/api/proxy?${new URLSearchParams(params)}`)
    }
    useEffect( () => {
        fetchData();
    }, [])

    return (
        <div className="">
            <div className="px-[10px]">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-[25px]">jingyunliang/swinir</h2>
                        <p>Image Restoration Using Swin Transformer</p>
                    </div>
                    <div className="flex gap-x-[10px]">
                        <div className="flex gap-x-[5px] items-center">
                            <LuGithub className="text-black w-[18px] h-[18px]" />
                             <div className="underline hover:cursor-pointer">GitHub</div>
                        </div>
                        <div className="flex gap-x-[5px] underline items-center">
                            <BiFile className="text-black w-[18px] h-[18px]" />
                            <div className="underline hover:cursor-pointer">Paper</div>
                        </div>
                        <div className="flex gap-x-[5px] underline items-center">
                            <FaBalanceScale className="text-black w-[18px] h-[18px]" />
                            <div className="underline hover:cursor-pointer">License</div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-x-[0px] border-gray-300 border-b-[1px] items-center">
                    <TiMediaPlayOutline className="text-black w-[18px] h-[18px]" />
                    <div className="text-[15px]">Playground</div>
                </div>
            </div>

             <div className="flex w-full pt-[10px] flex-row">
                <div className="w-[50%] border-gray-300 border-r-[1px] px-[10px]" >
                    <h4 className="text-[20px]">Input</h4>

                </div>

                <div className="w-[50%] px-[10px]">
                <h4 className="text-[20px]">Output</h4>

                </div>

             </div>


        </div>
    )
}

export default ItemDetail;
