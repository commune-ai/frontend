"use client"
import React from "react";
import Image from "next/image";
import communeModels from '@/utils/validatorData.json'
import { Button, Card } from "antd";
import classnames from "classnames";
import { ValidatorType } from "../api/staking/type";
import Verified from "./verified";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { formatTokenPrice } from "@/utils/tokenPrice";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import BubbleChartComponent from "./bubbleChart";

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
        model: 'rgb(184, 115, 51)', // Copper
        vali: 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)', // Gold gradient
        storage: 'rgb(192, 192, 192)', // Silver
        openai: 'rgb(153, 101, 21)' // Bronze or another metallic color
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
        <section className="my-10 mx-auto w-[95%]">
            <div className="flex justify-center mb-4 items-center flex-col sm:flex-col">

                <div className="flex items-center justify-center">

                    <span className="text-2xl text-left font-semibold flex gap-x-2 leading-10 text-purple tracking-tighter items-center">
                        <Image src="/img/frontpage/comai-webp.webp" alt="comm" height={30} width={50} />
                        <span className="dark:text-white" style={{ fontSize: '45px' }}>COMAI Modules</span>
                    </span>

                    <Button className="flex ml-2 mt-1 animate-bounce bg-pink-400 border-pink-400 hover:bg-pink-600" onClick={handleModuleDisplayType}>Visualize</Button>
                </div>

                <div className="relative flex items-center flex-1 w-full mt-4 mb-2">
                    <input
                        type="text"
                        className="custom-hover relative border-[1px] p-4 dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:border-gold-500 focus:ring-gold-500 w-full h-[90px] rounded-xl text-sm pl-10"
                        placeholder="Search"
                        data-sider-insert-id="db9b811e-18d7-4015-81fa-717d6caf33a9"
                        data-sider-select-id="2fc427bc-1699-4819-a3c8-1b98408e11c5"
                        onChange={({ target: { value } }) => setSearchString(value)}
                        style={{
                            fontSize: '28px',
                            paddingLeft: '3rem'
                        }}
                    />

                    <div className="absolute left-4 z-10 mr-2 ml-2" style={{ color: 'white' }}>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-textSecondary" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                    </div>
                </div>

            </div>
            {
                isShowModuleAsCard ?
                    <div className="flex justify-center flex-wrap gap-[4px] mt-5">
                        {
                            resultData && resultData.map(
                                module => {
                                    return <Card id="card"
                                        headStyle={{
                                            background: 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)', borderTopLeftRadius: '21px',
                                            borderTopRightRadius: '21px'
                                        }}
                                        title={
                                            <span className={classnames('text-black text-[44px] flex items-center justify-center mr-4 h-[100px]')}
                                            >
                                                {module.name} {module.isVerified && (
                                                    <Verified
                                                        isGold={
                                                            module.key ===
                                                            process.env.NEXT_PUBLIC_COMSTAT_VALIDATOR
                                                        }
                                                    />
                                                )}
                                            </span>
                                        }
                                        style={{
                                            width: 500,
                                            marginBottom: 20,
                                            boxShadow: '1px 1px 2px 2px #d8e4e0',
                                            background: '#4c4341',
                                            fontStyle: 'BlinkMacSystemFont'
                                        }}
                                        className={"flex flex-col mx-5 cursor-pointer shadow-xl card-class border-[1px] border-[#e8dc86] text-[#f2f2f2] rounded-[24px] w-[280px] duration-300 transition-all hover:opacity-75 hover:border-primary h-[300px]"} key={module.address + 1}>
                                        <p className='text-black' style={{ fontSize: '26px' }}>Stake: {numberWithCommas(
                                            formatTokenPrice({ amount: module.stake }),
                                        )}{" "}
                                            COMAI
                                        </p>
                                        <p className='text-black' style={{ fontSize: '26px' }}>Incentive: {module.incentive}</p>
                                        <p className='text-black' style={{ fontSize: '26px' }}>Dividends: {module.dividends}</p>

                                        <div className="flex items-center justify-evenly">

                                            <Link
                                                href={`/commune-modules/${module.subnet_id}/${module.key}`}
                                                className="flex items-center gap-x-1 underline text-black"
                                                style={{ fontSize: '24px' }}
                                            >
                                                Details <FaAngleRight />
                                            </Link>

                                            <Link
                                                href={`/workSpace/${module.key}`}
                                                className="flex items-center gap-x-1 underline text-black"
                                                style={{ fontSize: '24px' }}
                                            >
                                                Workspace <FaAngleRight />
                                            </Link>

                                            <Link
                                                href={`/stakers/${module.subnet_id}/${module.key}`}
                                                className="flex items-center gap-x-1 underline text-black"
                                                style={{ fontSize: '24px' }}
                                            >
                                                Stakers <FaAngleRight />
                                            </Link>

                                        </div>

                                    </Card>
                                }
                            )
                        }
                    </div>
                    :
                    <BubbleChartComponent data={resultData} />
            }

        </section>
    )

}

export default CommuneModulePage;
