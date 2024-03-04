import Image from 'next/image';
import { useRouter } from "next/navigation";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import Card from '@/components/atoms/card';
import { GiMeshBall } from "react-icons/gi";

type ModuleItemPropsType = {
    data: any;
}


const OpenAIModuleItem = ({ data }: ModuleItemPropsType) => {
    const router = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const onClickItemHandle = () => {
        data.category != "replicate" ?window.open(`https://${data.url}.hf.space`,"_blank" ) : window.open(data.url, "_blank");
        
        // window.open(data.url, "_blank");
    };

    return (

        <>
            <Modal open={openModal} onCancel={() => setOpenModal(false)} width={840} footer={null} >
                        <iframe className="w-[800px] h-[480px] p-[20px]" src={`https://${data.url}.hf.space`} ></iframe>
            </Modal>
            <Card className="p-[20px] cursor-pointer h-[200px]">
                <div onClick={() => onClickItemHandle()} className='relative'>
                    <div className='flex justify-between items-center mb-[20px]'>
                        <div className="text-[#0e0e0e] text-[18px] break-words w-[80%] truncate">{data.name}</div>
                        {
                            data.category == "replicate" ?
                                <GiMeshBall className="text-cyan-400 w-[20px] h-[20px]" /> :
                                <div>🤗</div>
                        }
                    </div>

                    {
                        data.category == "replicate" ?
                            <div className="absolute w-full h-[120px]">
                                {data.image_url ?
                                    <Image
                                        src={data.image_url}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="Image"
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
                            </div> :
                            <div className="mt-[40px]">
                                <p className='text-[40px] text-center'>{data.image_url}</p>
                            </div>
                    }

                </div>
            </Card>
        </>
    )

}


export default OpenAIModuleItem;

