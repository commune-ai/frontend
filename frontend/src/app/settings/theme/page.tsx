"use client"
import React, { useContext } from "react";
import LogoImage from '../../../../public/gif/logo/CubesShufflingGIF.gif'
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { DARKTHEME_PROVIDER, LIGHTTHEME_PROVIDER } from "@/store/action/type";

const ThemePage: React.FC = () => {

    const address = useSelector(({ transactionRecord: { address } }) => address)
    const router = useRouter()
    const dispatch = useDispatch<any>()
    const currentLocation = usePathname()

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

    const handleDarkThemeDiv = () => {
        dispatch({ type: DARKTHEME_PROVIDER })
    }

    const handleLightTheme = () => {
        dispatch({ type: LIGHTTHEME_PROVIDER })
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

                    <h1 className="flex flex-row items-center text-xl font-bold">
                        Theme Settings
                    </h1>

                    <div className="flex flex-row gap-5">
                        <div className="relative flex h-36 flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border bg-gradient-to-b p-4 text-center  from-white to-gray-100 dark:text-black">
                            <svg className="mb-1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M27 16.76V16v-.77l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11.35 11.35 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.48 11.48 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11.35 11.35 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.48 11.48 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51zM25.21 24l-3.43-1.16a8.86 8.86 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.36 9.36 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.86 8.86 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.36 9.36 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20z" fill="currentColor"></path><path d="M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6zm0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4z" fill="currentColor"></path></svg>
                            <span className="truncate leading-tight">System</span>
                        </div>

                        <div className="relative flex h-36 flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border bg-gradient-to-b p-4 text-center ring-2 ring-inset ring-blue-500 ring-offset-2 ring-offset-blue-300 from-white to-gray-100 dark:text-black" onClick={handleLightTheme}>
                            <svg className="mb-1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path></svg>
                            <span className="truncate leading-tight">Light</span>
                        </div>

                        <div className="relative flex h-36 flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border bg-gradient-to-b p-4 text-center  from-gray-800 to-gray-900 text-gray-200" onClick={handleDarkThemeDiv}>
                            <svg className="mb-1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z" fill="currentColor"></path>
                            </svg>
                            <span className="truncate leading-tight">Dark</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )

}

export default ThemePage;
