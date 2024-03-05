import Card from "@/components/atoms/card";
import { useRouter } from "next/navigation";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";

type ModuleItemPropsType = {
    id: string;
    subDomain: string;
    cardData: {
        title: string;
        emoji: string;
        colorFrom: string;
        colorTo: string;
        sdk: string;
        app_file: string;
        pinned: false
    };
}


const ModuleItem = ( { id, subDomain, cardData } : ModuleItemPropsType ) => {
	const router = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);

	const onClickItemHandle = () => {
		setOpenModal(true);
	};

    return (
        <>
            <Modal open={openModal} onCancel={() => setOpenModal(false) } width={"100%"} footer={null} >
                <iframe className="w-full h-[100vh] p-[10px] md:p-[20px]" src={`https://${subDomain}.hf.space`} ></iframe>
            </Modal>
            <Card className="p-[20px] cursor-pointer">
                <div onClick={() => onClickItemHandle()}>
                    <p className="text-[#0e0e0e] text-[18px] break-words w-[260px] h-[36px]">
                        {
                            cardData?.title
                        }
                    </p>
                    <div className="mt-[20px]">
                        <p className='text-[50px] text-center'>{cardData?.emoji}</p>
                    </div>
                </div>
            </Card>
        </>
    )

}


export default ModuleItem;
