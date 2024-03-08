"use client"
import React, { useState } from "react";
import LogoImage from '../../../../public/gif/logo/CubesShufflingGIF.gif'
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { Modal } from "antd";

const AuthenticationPage: React.FC = () => {

    const address = useSelector(({ transactionRecord: { address } }) => address)
    const router = useRouter()
    const currentLocation = usePathname()

    const [tokenName, setTokenName] = useState('')
    const [isShowTokenGenModalOpen, setIsShowTokenGenModalOpen] = useState(false)

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

    const handleShowTokenGenModal = () => {
        setIsShowTokenGenModalOpen(!isShowTokenGenModalOpen)
    }

    const handleCancel = () => {
        setIsShowTokenGenModalOpen(false)
    }

    const handleGenTokenButton = () => {

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
                                    backgroundImage: item.replace(/\s/g, '').toLowerCase() === selectedItem ? 'linear-gradient(to right,rgb(190 191 195), rgb(101 101 101))' : 'none'
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
                        Access Tokens
                    </h1>

                    <div className="mb-8 text-balance" id="two-fa-auth">
                        <h2 className="mb-3 text-lg font-semibold">User Access Tokens</h2>
                        <p className="mb-4 text-gray-500">Access tokens programmatically authenticate your identity to the Commune.io, allowing applications to perform specific actions specified by the scope of permissions (read, write, or admin) granted. Visit the documentation to discover how to use them.</p>

                        <button onClick={handleShowTokenGenModal} className="btn border-[rgb(229 231 235)] border-[1px] rounded-md p-2">New token</button>

                    </div>
                </div>

            </div>
            {
                isShowTokenGenModalOpen &&
                <Modal open={isShowTokenGenModalOpen} onCancel={handleCancel} title='🔑 Create a new access token' footer={null}>
                    <div className="flex flex-col">
                        <label htmlFor="displayName">Name
                            <input value={tokenName} onChange={({ target: { value } }) => setTokenName(value)} autoComplete="off" className="border-[2px] border-[#e5e7eb] w-full mt-1 block rounded-[0.375rem] p-2" name="displayName" placeholder="What's this token for?" />
                        </label>

                        <label htmlFor="role" className="mt-4">Role
                            <select name="role" className="w-full form-input mt-1 block rounded-[0.375rem] border-[#e5e7eb] border-[2px] p-2"><option value="read">read </option><option value="write">write </option>
                            </select>
                        </label>

                        <button className="w-full mt-4 block rounded-[0.375rem] btn p-2 border-[#e5e7eb] border-[2px]" onClick={handleGenTokenButton}>Generate a token</button>
                    </div>
                </Modal>
            }
        </div>
    )

}

export default AuthenticationPage;
