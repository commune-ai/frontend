"use client"
import React, { useState } from "react";
import LogoImage from '../../../../public/gif/logo/CubesShufflingGIF.gif'
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import QRCode from "react-qr-code";

const OrganizationPage: React.FC = () => {

    const address = useSelector(({ transactionRecord: { address } }) => address)
    const router = useRouter()
    const currentLocation = usePathname()

    const [isShow2Factor, setIsShow2Factor] = useState(false)

    const parts: string[] = currentLocation.split('/');
    // Get the last non-empty part
    const selectedItem: string = parts.filter(part => part !== '').pop() || '';

    const Items = [
        'Profile',
        'Account',
        'Authentication',
        'Organizations',
        'Billing',
        "Access Tokens",
        "Notifications",
        "Theme"
    ]

    const handleRouters = (item: string) => {
        router.push(`/settings/${item.replace(/\s/g, '').toLowerCase()}`)
    }

    const handleShow2Auth = () => {
        setIsShow2Factor(!isShow2Factor)
    }

    const handleCancel = () => {
        setIsShow2Factor(false)
    }

    return (
        <div className='flex h-[660px]'>
            <div className='w-[40%]  dark:bg-[#212324] dark:text-white flex flex-col items-center justify-start'>
                <div className="bg-[#f5f5f5] h-full rounded-xl dark:bg-[#2B2B33]">
                    <div className="flex flex-col items-center justify-center p-10">
                        <Image src={LogoImage} alt="image" width={250} height={250}
                            className="cursor-pointer" />
                        {
                            address &&
                            <span className="mt-5 text-[#000000] dark:text-[#ffffff]">
                                <span className="font-bold">Address:</span> {address}
                            </span>
                        }

                    </div>

                    {
                        Items.map((item, index) => {
                            return <div key={index}>
                                <div className="p-2 w-full cursor-pointer hover:bg-slate-400 hover:text-black" style={{
                                    backgroundImage: item.toLowerCase() === selectedItem ? 'linear-gradient(to right,rgb(190 191 195), rgb(101 101 101))' : 'none'
                                }} onClick={() => handleRouters(item)}>
                                    <span >{item}</span>
                                </div>
                            </div>
                        })
                    }

                </div>

            </div>

            <div className='w-[60%] dark:text-white flex items-start dark:bg-[#212324] flex-col'>
                <div className="mt-5 flex flex-col w-[80%]">

                    <h1 className="flex flex-row items-center text-xl font-bold mb-8">
                        Organizations Settings
                    </h1>

                    <div className="mb-8 text-balance" id="two-fa-auth">
                        <div className="overview-card-wrapper flex items-center px-3 py-2 text-gray-600 border-[1px] rounded-md">
                            You are not a member of any organization.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default OrganizationPage;
