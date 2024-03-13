"use client"
import React, { useState } from "react";
import LogoImage from '../../../../public/gif/logo/CubesShufflingGIF.gif'
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import QRCode from "react-qr-code";

const AuthenticationPage: React.FC = () => {

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
                        Authentication Settings
                    </h1>

                    <div className="mb-8 text-balance" id="two-fa-auth">
                        <h2 className="mb-3 text-lg font-semibold">Two-Factor Authentication</h2>
                        <p className="mb-4 text-gray-500">Add an extra identity check at sign-in. Use a trusted app or extension such as Google Authenticator, 1Password,
                            Authy, or Microsoft Authenticator to create your single-use passwords.
                        </p>
                        {
                            isShow2Factor ?
                                <div className="flex flex-col">
                                    <QRCode
                                        size={256}
                                        style={{ height: "auto", maxWidth: "17%", width: "17%" }}
                                        value="hey"
                                        viewBox={`0 0 256 256`}
                                    />
                                    <span className="mt-8 text-gray-500">You can also use your setup key (
                                        <pre className="inline">NLPT5XNAOLP6DKEK</pre>
                                        ) to manually configure your authenticator app.
                                    </span>

                                    <label htmlFor="" className="mt-6">6-digit code from the app</label>
                                    <input type="text" className="mt-1 form-input p-2 rounded-md" name="code" placeholder="XXXXXX" maxLength={6} pattern="[0-9]{6}" title="6-digit code" />

                                    <div className="flex mt-2">
                                        <button onClick={handleShow2Auth} className="btn border-[rgb(229 231 235)] border-[1px] rounded-md p-2">Save</button>
                                        <button onClick={handleCancel} className="btn border-[rgb(229 231 235)] border-[1px] rounded-md p-2 ml-2">Cancel</button>
                                    </div>
                                </div>
                                :
                                <button onClick={handleShow2Auth} className="btn border-[rgb(229 231 235)] border-[1px] rounded-md p-2">Add Two-Factor Authentication</button>
                        }

                    </div>
                </div>

            </div>
        </div>
    )

}

export default AuthenticationPage;