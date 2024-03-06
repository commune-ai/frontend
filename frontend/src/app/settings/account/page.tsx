"use client"
import React, { useState } from "react";
import LogoImage from '../../../../public/gif/logo/CubesShufflingGIF.gif'
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { deleteUserAccount, updateWalletAddress } from "@/store/action/transaction.record.action";

const AccountPage: React.FC = () => {

    const [Username, setUsername] = useState('');
    const [primaryEmail, setPrimaryEmail] = useState('');
    const [oldWalletAddress, setOldWalletAddress] = useState('')
    const [walletAddress, setWalletAddress] = useState('')
    const [confirmWalletAddress, setConfirmWalletAddress] = useState('')

    const address = useSelector(({ transactionRecord: { address } }) => address)
    const router = useRouter()
    const currentLocation = usePathname()

    const dispatch = useDispatch<any>()

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

    const handleSaveUserNameAndEmail = () => {
        const formData = new FormData();
        formData.append('Username', Username);
        formData.append('primaryEmail', primaryEmail);

        axios.post('http://localhost:8000/authentication/saveUserNameAndEmail/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log('File uploaded successfully!', response.data);
                // You can handle success here, e.g., update state, show success message, etc.
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
                // Handle errors here, e.g., show error message to the user
            });
    }

    const handleRouters = (item: string) => {
        router.push(`/settings/${item.replace(/\s/g, '').toLowerCase()}`)
    }

    const handleSaveNewWalletAddress = () => {
        dispatch(updateWalletAddress(oldWalletAddress, walletAddress))
       
    }

    const handleDeletUserAccount = () => {
        dispatch(deleteUserAccount(address))
    }

    return (
        <div className='flex'>
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
                        Account Settings
                    </h1>

                    <label className="mt-5">Username</label>
                    <input value={Username} onChange={({ target: { value } }) => setUsername(value)} className="mt-1 dark:bg-slate-600 dark:text-white flex justify-center p-2 w-full rounded-md" />

                    <label className="mt-3">Primary email</label>
                    <input value={primaryEmail} onChange={({ target: { value } }) => setPrimaryEmail(value)} className="mt-1 dark:bg-slate-600 dark:text-white flex justify-center p-2 w-full rounded-md" />
                    <span className="dark:text-[#ccd5e1] text-gray-500">
                        We will use this email to communicate with you. This is also the email to use to authenticate on comwallet.co and comchat.io.
                    </span>
                    <button className='mt-4 gap-2 border-[rgb(229 231 235)] w-[20%] inline-flex cursor-pointer items-center justify-center rounded-[0.5rem] border-[1px] p-1 hover:scale-105' onClick={handleSaveUserNameAndEmail}>
                        Save Changes
                    </button>

                    <label className="mt-5">Old WalletAddress</label>
                    <input value={oldWalletAddress} onChange={({ target: { value } }) => setOldWalletAddress(value)} className="mt-1 dark:bg-slate-600 dark:text-white flex justify-center p-2 w-full rounded-md" />

                    <label className="mt-3">WalletAddress</label>
                    <input value={walletAddress} onChange={({ target: { value } }) => setWalletAddress(value)} className="mt-1 dark:bg-slate-600 dark:text-white flex justify-center p-2 w-full rounded-md" />

                    <label className="mt-3">Confirm your new wallet address</label>
                    <input value={confirmWalletAddress} onChange={({ target: { value } }) => setConfirmWalletAddress(value)} className="mt-1 dark:bg-slate-600 dark:text-white flex justify-center p-2 w-full rounded-md" />
                    <button className='mt-4 gap-2 border-[rgb(229 231 235)] w-[20%] inline-flex cursor-pointer items-center justify-center rounded-[0.5rem] border-[1px] p-1 hover:scale-105' onClick={handleSaveNewWalletAddress}>
                        Save Changes
                    </button>

                    <span className="mt-5 text-lg font-semibold">
                        Delete your account
                    </span>

                    <span className="text-gray-500">
                        Delete your Commune account permanently, this action is irreversible. All your informations
                        will be deleted.
                    </span>
                    <button className="w-[18%] mt-2 mb-3 cursor-pointer btn text-center hover:text-red-500 border-[1px] rounded-md border-white p-2" type="button" onClick={handleDeletUserAccount}>Delete my account</button>
                </div>

            </div>
        </div>
    )

}

export default AccountPage;


