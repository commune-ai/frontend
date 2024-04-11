"use client"
import React from "react";
import Image from "next/image";
import ValidatorTable from "./validatorTable";
import { BorderOuterOutlined } from "@ant-design/icons";
import communeModels from '@/utils/validatorData.json'
import { Card } from "antd";
import classnames from "classnames";
import Style from './commune-module.module.css';
import { ValidatorType } from "../api/staking/type";
import Verified from "./verified";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { formatTokenPrice } from "@/utils/tokenPrice";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

interface ModuleColors {
    [key: string]: string;
}

export const CommuneModulePage = () => {

    const [searchString, setSearchString] = React.useState('')
    const [isShowModuleAsCard, setIsShowModuleAsCard] = React.useState(true)
    const [resultData, setResultData] = React.useState<ValidatorType[]>(communeModels)

    React.useEffect(() => {

        if (searchString) {

            const temp = communeModels.filter((item) => {
                return item.address.toLowerCase().includes(searchString.toLowerCase())
                    || item.subnet_id.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.name.toLowerCase().includes(searchString.toLowerCase())
                    || item.emission.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.incentive.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.dividends.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.regblock.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.last_update.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.balance.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.stake.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.total_stakers.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.delegation_fee.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.type.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.key.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.apy.toString().toLowerCase().includes(searchString.toLowerCase())
                    || item.isVerified.toString().toLowerCase().includes(searchString.toLowerCase())
            })

            setResultData(temp)

        }
    }, [searchString])

    const handleModuleDisplayType = () => {
        setIsShowModuleAsCard(!isShowModuleAsCard)
    }

    const moduleColors: ModuleColors = {
        vali: '#FF5733', // Red
        model: '#33FF57', // Green
        storage: '#3357FF', // Blue
        openai: 'rgb(51, 255, 87)'
        // Add more module-color mappings as needed
    };

    const getColorForModule = (moduleName: string): string => {
        if (moduleName.includes('vali')) {
            return moduleColors['vali'] || '#000'; // Color for 'vali'
        } else if (moduleName.includes('model')) {
            return moduleColors['model'] || '#000'; // Color for 'model'
        } else if (moduleName.includes('storage')) {
            return moduleColors['storage'] || '#000'; // Color for 'storage'
        } else if (moduleName.includes('openai')) {
            return moduleColors['openai'] || '#000'; // Color for 'openai'
        } else {
            return '#000'; // Default color is black
        }
    };

    return (
        <section className="container my-10 mx-auto ">
            <div className="flex justify-center mb-4 items-center flex-col sm:flex-col">

                <div className="flex items-center justify-center">

                    <span className="text-2xl text-left font-semibold flex gap-x-2 leading-10 text-purple tracking-tighter items-center">
                        <Image src="/img/frontpage/comai-webp.webp" alt="comm" height={30} width={30} />
                        <span>COMAI Modules</span>
                    </span>

                    <BorderOuterOutlined className="ml-3 cursor-pointer" height={30} width={30} style={{ width: '30px', height: '30px' }} alt="Switch format" onClick={handleModuleDisplayType} />

                </div>

                <div className="relative flex items-center flex-1 w-full mt-2">
                    <input type="text" className="relative  border-[1px] w-full h-[50px] rounded-xl text-sm pl-10" placeholder="Search" data-sider-insert-id="db9b811e-18d7-4015-81fa-717d6caf33a9" data-sider-select-id="2fc427bc-1699-4819-a3c8-1b98408e11c5" onChange={({ target: { value } }) => setSearchString(value)} />
                    <div className="absolute left-4 z-10">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-textSecondary" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                    </div>
                </div>

            </div>
            {
                isShowModuleAsCard ?
                    <div className="flex justify-center flex-wrap gap-[10px] mt-5">
                        {
                            resultData && resultData.map(
                                module => {
                                    return <Card title={
                                        <span className={classnames('text-white text-[22px] flex items-center justify-center mr-4')}>
                                            {module.name.split('::')[0]} {module.isVerified && (
                                                <Verified
                                                    isGold={
                                                        module.key ===
                                                        process.env.NEXT_PUBLIC_COMSTAT_VALIDATOR
                                                    }
                                                />
                                            )}
                                        </span>
                                    }
                                        style={{ width: 300, marginBottom: 20, backgroundColor: getColorForModule(module.name) }} className={classnames(Style.cardClass, 'flex flex-col text-[18px] mx-5 cursor-pointer shadow-xl card-class border-[1px] border-[#f2f2f2] text-[#f2f2f2] rounded-[20px] w-[280px] bg-[#1f2330] duration-300 transition-all hover:opacity-75 hover:border-primary h-[300px]')} key={module.address}>
                                        <p className='text-white'>subnet_id: {module.subnet_id}</p>
                                        <p className='text-white'>Stakers: {module.total_stakers}</p>
                                        <p className='text-white'>Stake: {numberWithCommas(
                                            formatTokenPrice({ amount: module.stake }),
                                        )}{" "}
                                            COMAI</p>

                                        <Link
                                            href={`/commune-modules/${module.key}`}
                                            className="flex items-center gap-x-1 underline"
                                        >
                                            Details <FaAngleRight />
                                        </Link>
                                    </Card>
                                }
                            )
                        }
                    </div>
                    :
                    <ValidatorTable searchString={searchString} />
            }

        </section>
    )

}

export default CommuneModulePage;
