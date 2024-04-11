"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { FaUsers } from "react-icons/fa"
import { FaArrowLeft, FaDiscord } from "react-icons/fa6"
import { FaXTwitter } from "react-icons/fa6"
import { GiProfit } from "react-icons/gi"
import { GoKey } from "react-icons/go"
import { PiCirclesFourLight } from "react-icons/pi"
import { RiAiGenerate } from "react-icons/ri"
import { SiBlockchaindotcom } from "react-icons/si"
import { TbWorld } from "react-icons/tb"
import Verified from "../verified"
import StakingModal from "@/components/atoms/modal/stake"
import { usePolkadot } from "@/context"
import { numberWithCommas } from "@/utils/numberWithCommas"
import { formatTokenPrice } from "@/utils/tokenPrice"
import communeModels from '@/utils/validatorData.json'
import Style from '../commune-module.module.css'
import classnames from "classnames"
import { CheckOutlined, CopyOutlined } from "@ant-design/icons"
import { Button } from "antd"

interface ModuleColors {
    [key: string]: string;
}

const ValidatorDetailPage = () => {

    const params = useParams()

    const validatorData = communeModels.find(item => item.key === params?.id)

    const [copiedValidatorKey, setCopiedValidatorKey] = useState(false);
    const [copiedNetworkUrl, setCopiedNetworkUrl] = useState(false)
    const [copiedModuleName, setCopiedModuleName] = useState(false)

    const copyToClipboardValidatorKey = async (text: string | undefined) => {
        try {
            if (text) {
                await navigator.clipboard.writeText(text);
                setCopiedValidatorKey(true);
            }
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const copyToClipboardNetworkUrl = async (text: string | undefined) => {
        try {
            if (text) {
                await navigator.clipboard.writeText(text);
                setCopiedNetworkUrl(true);
            }
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const copyToClipboardModuleAddress = async (text: string | undefined) => {
        try {
            if (text) {
                await navigator.clipboard.writeText(text);
                setCopiedModuleName(true);
            }
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const { isConnected } = usePolkadot()
    const router = useRouter()
    const [stakingOpen, setStakingOpen] = useState(false)

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
        <div className="container px-3 md:px-0 mx-auto mb-4">
            <div className="flex py-5 items-center gap-x-3">
                <button
                    className="border-2 p-2 rounded-lg cursor-pointer"
                    onClick={() => router.push("/commune-modules")}
                >
                    <FaArrowLeft />
                </button>
                <span className="text-lg font-semibold flex items-center gap-x-2 mr-2" style={{ fontSize: '26px' }}>
                    {
                        validatorData?.name
                    }{" "}

                    {
                        validatorData?.isVerified && (
                            <Verified
                                isGold={
                                    validatorData.key === process.env.NEXT_PUBLIC_COMSTAT_VALIDATOR
                                }
                            />
                        )
                    }

                    {
                        copiedModuleName ? <CheckOutlined /> : <CopyOutlined onClick={() => copyToClipboardModuleAddress(validatorData?.name)} />
                    }

                </span>

                <span className="card-validator-data truncate" style={{ fontSize: '26px' }}>
                    {validatorData?.key}
                    {
                        copiedValidatorKey ? <CheckOutlined className="ml-2" /> : <CopyOutlined className="ml-2" onClick={() => copyToClipboardValidatorKey(validatorData?.key)} />
                    }
                </span>

                <span className="card-validator-data mr-2" style={{ fontSize: '26px' }}>
                    {validatorData?.address}
                    {copiedNetworkUrl ? <CheckOutlined className="ml-2"/> : <CopyOutlined className="ml-2" onClick={() => copyToClipboardNetworkUrl(validatorData?.address)} />}
                </span>

            </div>

            <div className="flex gap-x-5 flex-col items-center lg:items-start lg:flex-row">
                <div className="p-4 w-[500px]">

                    <div className={classnames(Style.cardClass, "h-64 w-64 flex justify-center items-center rounded-3xl mx-auto dark:text-black bg-[#1f2330] duration-300 transition-all hover:opacity-75 hover:border-primary shadow-xl border-[1px] border-[#f2f2f2] cursor-pointer")}
                        style={{ backgroundColor: validatorData && getColorForModule(validatorData.name), width: '320px', height: '320px' }}
                    >
                        <span className="dark:text-white" style={{ fontSize: '46px' }}>{validatorData?.name}</span>
                    </div>
                    {
                        validatorData?.key ===
                        process.env.NEXT_PUBLIC_COMSTAT_VALIDATOR && (
                            <p className="text-md mt-[3.5rem] text-center" style={{ fontSize: '23px' }}>
                                All Statistics of CommuneAI at one place. Staking
                                infrastructure, prices, validators, miners, swap, bridge,
                                exchange for $COMAI
                            </p>
                        )
                    }

                    <div className="flex justify-center gap-x-4 mt-[1.5rem]">
                        <a href="" target="_blank">
                            <FaDiscord size={22} />
                        </a>
                        <a href="" target="_blank">
                            <FaXTwitter size={22} />
                        </a>
                        <a href="" target="_blank">
                            <TbWorld size={22} />
                        </a>
                    </div>

                    <div className="mt-[3rem]">
                        {
                            !isConnected && (
                                <p className="text-[16px] mb-1 italic text-center text-red-400">
                                    You have not connected your wallet.
                                </p>
                            )
                        }

                        <Button
                            size="large"
                            type="primary"
                            className="w-full justify-center cursor-pointer font-[26px]"
                            disabled={!isConnected}
                            onClick={() => setStakingOpen(true)}
                            style={{ fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
                        >
                            <span className="font-[26px]">Stake Now</span>
                        </Button>

                    </div>

                </div>

                <div className="flex gap-4 flex-col flex-1 mt-4">
                    <div className="border-[1px] rounded-lg bg-[rgb(239 246 255)] p-3 w-full">
                        <p className="card-validator-heading flex items-center justify-start ">
                            <GoKey size={16} className="mr-2" /> <span style={{ fontSize: '26px' }}>Validator Key</span>
                        </p>

                        <span className="card-validator-data truncate dark:text-white mr-2" style={{ fontSize: '26px' }}>
                            {validatorData?.key}
                        </span>

                        {
                            copiedValidatorKey ? <CheckOutlined /> : <CopyOutlined onClick={() => copyToClipboardValidatorKey(validatorData?.key)} />
                        }

                    </div>

                    <div className="flex pt-3 lg:space-x-3 flex-wrap">
                        <div className="border-[1px] rounded-lg bg-[rgb(239 246 255)] p-3 w-[32%]">
                            <p className="card-validator-heading flex items-center justify-start">
                                <PiCirclesFourLight size={20} className="mr-2" style={{ fontSize: '26px' }} />
                                <span style={{ fontSize: '26px' }}>Network URL</span>
                            </p>

                            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="square" style={{ width: '20px', height: '20px', backgroundColor: 'red', marginRight: '5px' }}></div>
                            <div className="square" style={{ width: '20px', height: '20px', backgroundColor: 'blue', marginRight: '5px' }}></div>
                            <div className="square" style={{ width: '20px', height: '20px', backgroundColor: 'green', marginRight: '5px' }}></div>
                        </div> */}

                            <span className="card-validator-data dark:text-white mr-2" style={{ fontSize: '26px' }}>{validatorData?.address}</span>

                            {copiedNetworkUrl ? <CheckOutlined /> : <CopyOutlined onClick={() => copyToClipboardNetworkUrl(validatorData?.address)} />}
                        </div>

                        <div className="border-[1px] rounded-lg bg-[rgb(239 246 255)] p-3 w-[32%]">
                            <p className="card-validator-heading flex items-center justify-start ">
                                <GiProfit size={20} className="mr-2" style={{ fontSize: '26px' }} />
                                <span style={{ fontSize: '26px' }}>APY</span>
                            </p>
                            <span className="card-validator-data dark:text-white" style={{ fontSize: '26px' }}>
                                {validatorData?.apy?.toFixed(2)}%
                            </span>
                        </div>
                    </div>

                    <div className="container">
                        <div className="flex pt-3 lg:space-x-3 flex-wrap">
                            <div className="border-[1px] rounded-lg bg-[rgb(239 246 255)] p-3 w-[32%]">
                                <p className="card-validator-heading flex items-center justify-start">
                                    <SiBlockchaindotcom size={20} className="mr-2" />
                                    <span style={{ fontSize: '26px' }}>Total Staked</span>
                                </p>
                                <span className="card-validator-data dark:text-white" style={{ fontSize: '26px' }}>
                                    {numberWithCommas(
                                        formatTokenPrice({
                                            amount: Number(validatorData?.stake),
                                        }),
                                    )}{" "}
                                    COMAI
                                </span>
                            </div>
                            <div className="border-[1px] rounded-lg bg-[rgb(239 246 255)] p-3 w-[32%]">
                                <p className="card-validator-heading flex items-center justify-start">
                                    <SiBlockchaindotcom size={20} className="mr-2" />
                                    <span style={{ fontSize: '26px' }}>Registration Block</span>
                                </p>
                                <span className="card-validator-data dark:text-white" style={{ fontSize: '26px' }}>
                                    {validatorData?.regblock}
                                </span>
                            </div>
                            <div className="border-[1px] rounded-lg bg-[rgb(239 246 255)] p-3 w-[32%]">
                                <p className="card-validator-heading flex items-center justify-start">
                                    <FaUsers size={20} className="mr-2" />
                                    <span style={{ fontSize: '26px' }}>Total Stakers</span>
                                </p>
                                <span className="card-validator-data dark:text-white" style={{ fontSize: '26px' }}>
                                    {validatorData?.total_stakers}
                                </span>
                            </div>

                        </div>

                        <div className="flex pt-5 flex-wrap lg:space-x-3">

                            <div className="border-[1px] rounded-lg bg-[rgb(239 246 255)] p-3 w-[32%]">
                                <p className="card-validator-heading flex items-center justify-start ml-1">
                                    <RiAiGenerate size={20} />
                                    <span className="ml-2" style={{ fontSize: '26px' }}>Incentive</span>
                                </p>
                                <span className="card-validator-data dark:text-white" style={{ fontSize: '26px' }}>
                                    {validatorData?.incentive}
                                </span>
                            </div>
                            <div className="border-[1px] rounded-lg bg-[rgb(239 246 255)] p-3 w-[32%]">
                                <p className="card-validator-heading flex items-center justify-start">
                                    <RiAiGenerate size={20} className="mr-2" />
                                    <span style={{ fontSize: '26px' }}>Emission per 100 blocks</span>
                                </p>
                                <span className="card-validator-data dark:text-white" style={{ fontSize: '26px' }}>
                                    {numberWithCommas(
                                        formatTokenPrice({
                                            amount: Number(validatorData?.emission),
                                        }),
                                    )}{" "}
                                </span>
                            </div>

                            <div className="border-[1px] rounded-lg bg-[rgb(239 246 255)] p-3 w-[32%]">
                                <p className="card-validator-heading flex items-center justify-start">
                                    <RiAiGenerate size={20} className="mr-2" />
                                    <span style={{ fontSize: '26px' }}>Dividends</span>
                                </p>
                                <span className="card-validator-data dark:text-white" style={{ fontSize: '26px' }}>
                                    {validatorData?.dividends}
                                </span>
                            </div>
                        </div>

                        <StakingModal
                            open={stakingOpen}
                            setOpen={setStakingOpen}
                            validatorId={String(params?.id)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ValidatorDetailPage
