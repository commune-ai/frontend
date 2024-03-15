import Image from 'next/image';
import { useRouter } from "next/navigation";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import Card from '@/components/atoms/card';
import { GiMeshBall } from "react-icons/gi";
import { FaGithub } from "react-icons/fa6"
import { FaRegHeart } from "react-icons/fa";

type ModuleItemPropsType = {
    data: any;
}


const OpenAIModuleItem = ({ data }: ModuleItemPropsType) => {
    const router = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const onClickItemHandle = () => {
        setOpenModal(true);
    };
    const  onClickGitHubHandle = () => {
        window.open(data.github_url, "_blank");
    }

    return (

        <>
           <Modal open={openModal} onCancel={() => setOpenModal(false)} width={1240} footer={null} >
                {
                  <iframe className="w-[1200px] h-[700px] p-[20px]" src={`https://${data.url}.hf.space`} ></iframe>               
                }
            </Modal>
            {
                data.category == "replicate" ?
                    <Card className=" h-[320px]" colorfrom={'white'} colorto={'white'}>
                        <div  className='relative z-0 flex flex-col '>
                            <div className="cursor-pointer absolute w-full h-[250px]" onClick={() => onClickItemHandle()}>
                                {data.image_url ?
                                    <Image
                                        src={data.image_url}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="Image"
                                        className="rounded-t-[7px]"
                                    />
                                    :
                                    <Image
                                        className='hidden'
                                        src={''}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="Image"
                                    />
                                }
                            </div>
                            <h4 className='absolute top-[270px] left-[10px] max-w-full truncate text-center font-bold text-gray-800 text-xl'>{data.name}</h4>
                            <div className='flex gap-x-[10px] items-center absolute  top-[275px] right-[10px]'>
                                <FaGithub className="text-gray-800 w-[20px] h-[20px] cursor-pointer" onClick={() => onClickGitHubHandle()}/>
                                <span className=' text-gray-800 '>{data.likes}</span>
                            </div>

                        </div>
                    </Card> :
                    <Card className={`p-[20px] cursor-pointer h-[250px] hover:brightness-110`} colorfrom={data.colorfrom} colorto={data.colorto}>
                        <div onClick={() => onClickItemHandle()} className='relative z-10 flex flex-col items-center justify-center'>
                            <div className="absolute opacity-60 text-6xl drop-shadow-xl text-center top-[70px]">
                                <Image
                                    className='hidden'
                                    src={''}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Image"
                                />
                                {data.image_url}
                            </div>
                            <h4 className='absolute top-[85px] z-40 max-w-full truncate text-center font-bold text-blue-50 text-xl'>{data.name}</h4>
                            <div className='absolute right-0 flex gap-x-[10px] items-center'>
                                <FaRegHeart className="text-white w-[20px] h-[20px]" />
                                <span className='text-white'>{data.likes}</span>
                            </div>
                        </div>
                    </Card>
            }

        </>
    )

}

export default OpenAIModuleItem;


