"use client"
import React, { useState } from "react";
import LogoImage from '../../../../public/gif/logo/CubesShufflingGIF.gif'
import Image from "next/image";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import axios from "axios";
import { useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const ProfileEditPage: React.FC = () => {

    const [fullName, setFullName] = useState('');
    const [username, setUserName] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const address = useSelector(({ transactionRecord: { address } }) => address)
    const router = useRouter()
    const currentLocation = usePathname()

    const parts: string[] = currentLocation.split('/');
    // Get the last non-empty part
    const selectedItem: string = parts.filter(part => part !== '').pop() || '';

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

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

    const handleSaveUserProfile = () => {
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('userName', username);
        if (fileList.length > 0) {
            const firstFile = fileList[0];
            formData.append('avatar', firstFile.name);
        }

        axios.post('http://localhost:8000/authentication/profile/', formData, {
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

    return (
        <div className='flex h-[70vh]'>
            <div className='w-[40%]  dark:bg-[#212324] dark:text-white flex flex-col items-center justify-start'>
                <div className="bg-[#f5f5f5] h-full rounded-xl dark:bg-[#2B2B33]">
                    <div className="flex flex-col items-center justify-center p-10">
                        <Image src={LogoImage} alt="image" width={250} height={250}
                            className="cursor-pointer" />
                        {
                            address && <span className="mt-5 text-[#000000] dark:text-[#ffffff]">
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
                    <span className="flex mt-14" style={{ fontWeight: '500' }}>
                        Profile Settings
                    </span>
                    <label className="mt-[5rem]">Full name</label>
                    <input value={fullName} onChange={({ target: { value } }) => setFullName(value)} className="mt-1 dark:bg-slate-600 dark:text-white flex justify-center p-2 w-full rounded-md" />

                    <label className="mt-[4rem]">Username</label>
                    <input value={username} onChange={({ target: { value } }) => setUserName(value)} className="mt-1 dark:bg-slate-600 dark:text-white flex justify-center p-2 w-full rounded-md" />

                    <label className="mt-[4rem]">Avatar <span className="dark:text-gray-500">(Optional)</span></label>
                    <Upload
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture-circle"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>

                    <button className='mt-4 gap-2 border-[rgb(229 231 235)] w-[20%] inline-flex cursor-pointer items-center justify-center rounded-[0.5rem] border-[1px] p-1 hover:scale-105' onClick={handleSaveUserProfile}>
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    )

}

export default ProfileEditPage;
