"use client"
import React, { useState } from "react";
import LogoImage from '../../../../public/gif/logo/CubesShufflingGIF.gif'
import Image from "next/image";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import axios from "axios";
import { useSession } from "next-auth/react";
import { Session } from "inspector";
import { BsCoin } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";
import MetaBalance from "./metamask";


const ProfileEditPage: React.FC = () => {
    
    const session = useSession();

    const [openModal, setOpenModal] = useState(false)
    const Items = [
        'Coins',
        'Account',
        'Authentication',
        'Organizations',
        'Billing',
        "Access Tokens",
        "Notifications",
        "Theme"
    ]

    const [copied, setCopied] = useState(false);

    const CopyButton = () => {
        const textToCopy = '0x70Ef8dCDE8d5F0212D17dDec50e57F1a2b0EB05F';
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000); // Adjust the timeout value (in milliseconds) as needed
            })
            .catch((error) => {
                console.error('Error copying text to clipboard:', error);
            });
    }

    const handlebuy = () => {

        setOpenModal(true);
    }

    return (
        <div className='flex min-h-[800px] my-[30px] gap-x-[40px] mx-[30px]'>
            <div className='w-[15%]  dark:bg-[#212324] dark:text-white flex flex-col items-center justify-start'>
                <div className="bg-[#f5f5f5] h-full rounded-xl dark:bg-[#2B2B33] w-full">
                    <div className="flex items-center justify-center p-10">
                        <Image src={LogoImage} alt="image" width={100} height={150}
                            className="cursor-pointer" />
                        <div className="flex flex-col">
                            <span>
                                {session.data?.user?.name}
                            </span>
                        </div>

                    </div>

                    {
                        Items.map((item, index) => {
                            return <div key={index}>
                                <div className="p-[10px] w-full cursor-pointer hover:bg-slate-400 hover:text-black">
                                    <span >{item}</span>
                                </div>
                            </div>
                        })
                    }

                </div>

            </div>

            <div className='w-[85%] dark:text-white flex items-start dark:bg-[#212324] flex-col relative'>

                <div className="bg-[#f5f5f5] h-full rounded-xl dark:bg-[#2B2B33] w-full p-[30px]">
                    <h1>Buy Coin</h1>
                    <div className="flex gap-x-[5px] items-center pb-[10px]">
                        <span>Your available coins:</span>
                        <span>12</span>
                        <BsCoin className="text-yellow-500 w-[20px] h-[20px]"></BsCoin>
                    </div>
                    <p>Select the amount to buy</p>
                    <select className="p-[10px] w-[400px] rounded-md bg-white dark:bg-gray-400 ">
                        <option>10 for $1.5  </option>
                        <option> 20 for $3.0 </option>
                        <option> 40 for $6.0 </option>
                        <option> 60 for $9.0 </option>
                        <option> 80 for $12.0 </option>
                        <option> 100 for $15.0 </option>
                        <option> 150 for $22.5 </option>
                        <option> 200 for $30.0 </option>
                    </select>
                    <div className="flex gap-x-[10px] pt-[20px] relative">
                        <p>Address: 0x70Ef8dCDE8d5F0212D17dDec50e57F1a2b0EB05F</p>
                        <FaRegCopy className="w-[20px] h-[20px] cursor-pointer " onClick={CopyButton}></FaRegCopy>
                        {copied && (
                            <span className="absolute top-[-25px] left-[400px] bg-black text-white px-2 py-1 rounded opacity-75 transition-opacity duration-500">
                                Copied!
                            </span>
                        )}

                    </div>

                </div>
                <div className="absolute flex gap-x-[10px] right-[20px] bottom-[20px]">
                    <div className="py-[5px] px-[10px] border-[1px] rounded-lg cursor-pointer hover:opacity-40" >cancel</div>
                    <div className="py-[5px] px-[20px] border-[1px] rounded-lg cursor-pointer hover:opacity-40 bg-green-500 border-green-600" onClick={handlebuy}>buy</div>
                </div>
                
                <Modal open={openModal} onCancel={() => setOpenModal(false)} footer={null} >
                       <MetaBalance></MetaBalance>            
                </Modal>
                  
               
                
                 
        
            </div>
        </div>
    )

}

export default ProfileEditPage;
