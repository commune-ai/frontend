import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Image from "next/image";
import LogoImage from '../../../../public/gif/logo/CubesShufflingGIF.gif'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ProfileDropDownComponent: React.FC = () => {

    const router = useRouter()
    const session = useSession();

    const handleUserProfile = () => {
        console.log('clicked');
    }

    const handleProfile = () => {
        router.push('/settings/profile')
    }

    const handlePrediction = () => {
        router.push('/prediction')
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className='flex flex-col' onClick={handleProfile}>
                    <span>
                       Profile
                    </span>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className='flex' onClick={handlePrediction}>
                    <span>
                       Prediction
                    </span>
                </div>
            ),
        },
    ];

    return (

        <Dropdown menu={{ items }} arrow={false}>
            <a onClick={(e) => e.preventDefault()}>
                    <div className="flex items-center gap-x-[10px] hover:opacity-50">
                        <Image src={String(session.data?.user?.image)} width={25} height={25} alt="image" className="rounded-full" />
                        <span className="text-white"> {session.data?.user?.name}</span>
                    </div>
            </a>
        </Dropdown>
    );
};

export default ProfileDropDownComponent;
