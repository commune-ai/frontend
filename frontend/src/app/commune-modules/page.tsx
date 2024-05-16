"use client"
import React from "react";
import classnames from "classnames";
import { useRouter } from "next/navigation";
import { Card } from "antd";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { formatTokenPrice } from "@/utils/tokenPrice";
import communeModels from '@/utils/validatorData.json';
import styles from './commune-module.module.css';
import { ValidatorType } from "../api/staking/type";

const CommuneModulePage = () => {

    const router = useRouter();

    const [searchString, setSearchString] = React.useState('');
    const [filteredData, setFilteredData] = React.useState<ValidatorType[]>(communeModels);

    React.useEffect(() => {
        if (searchString.trim() === '') {
            setFilteredData(communeModels);
        } else {
            const filtered = communeModels.filter(item =>
                item.name.toLowerCase().includes(searchString.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchString]);

    const handleShowModulePage = (subnet_id: number, key: string) => {
        router.push(`/module-page/${subnet_id}/${key}`);
    };

    return (
        <div className="bg-[url(/img/dots-bg.svg)] dark:bg-[url(/img/dot-bg-dark.svg)]">
            <section className="my-10 mx-auto w-[95%] bg-[url(/img/dots-bg.svg)]">
                <div className="flex justify-center mb-4 items-center flex-col sm:flex-col">
                    <div className="relative flex items-center flex-1 w-full mt-4 mb-2">
                        <input
                            type="text"
                            className="custom-hover relative border-[1px] p-4 dark:bg-gray-900 dark:text-[#f9d7d2] dark:border-[gray-600] focus:border-[#f9d7d2] focus:ring-[#f9d7d2] w-full h-[90px] rounded-xl text-sm pl-10"
                            placeholder="Search"
                            onChange={({ target: { value } }) => setSearchString(value)}
                            style={{
                                fontSize: '28px',
                                paddingLeft: '3rem'
                            }}
                        />
                        <div className="absolute left-4 z-10 mr-2 ml-2" style={{ color: '[#32CD32]' }}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-textSecondary" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center flex-wrap gap-[4px] mt-5">
                    {
                        filteredData.map(module => (
                            <Card
                                key={`${module.address}_${module.key}`} // Ensure unique key
                                title={
                                    <span className={classnames(`dark:bg-[#f9d7d2] text-black text-[28px] retro-font flex items-center justify-center mr-4 h-[65px] dark:text-black ${styles.fontStyle}`)}>
                                        {module.name}
                                    </span>
                                }
                                style={{
                                    width: 500,
                                    marginBottom: 20,
                                    boxShadow: '3px 3px 3px 3px #f9d7d2',
                                    background: 'black',
                                    fontFamily: 'VCR_OSD_MONO'
                                }}
                                headStyle={{ background: '#f9d7d2', borderRadius: '19px 19px 0 0' }}
                                onClick={() => handleShowModulePage(module.subnet_id, module.key)}
                                className="flex flex-col mx-5 cursor-pointer shadow-xl card-class border-[2px] border-[#f9d7d2] text-[#e56800] rounded-[24px] w-[280px] duration-300 transition-all hover:opacity-75 hover:border-primary h-[300px]"
                            >
                                <div className={`text-black dark:text-white ${styles.fontStyle}`} style={{ fontSize: '32px' }}>
                                    <span className={`dark:text-[#f9d7d2] mr-3 ${styles.fontStyle}`}>
                                        stake:
                                    </span>
                                    {numberWithCommas(formatTokenPrice({ amount: module.stake }))}
                                </div>
                                <div className={`text-black retro-font dark:text-white flex items-center justify-start ${styles.fontStyle}`} style={{ fontSize: '32px' }}>
                                    <span className={`dark:text-[#f9d7d2] mr-3 ${styles.fontStyle}`}>incentive:</span>  {module.incentive}
                                </div>
                                <div className={`text-black retro-font dark:text-white flex items-center justify-start ${styles.fontStyle}`} style={{ fontSize: '32px' }}>
                                    <span className={`dark:text-[#f9d7d2] mr-3 ${styles.fontStyle}`}>dividends:</span>  {module.dividends}
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </section>
        </div>

    );
};

export default CommuneModulePage;
