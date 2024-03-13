import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Overview',
        children:
            <div className="shadow-alternate-sm mt-4 flex max-w-2xl flex-col space-y-2 rounded-xl border border-gray-100 p-4 sm:flex-row sm:space-y-0 sm:px-7 sm:py-4 " style={{ boxShadow: '0 5px 5px #00000008,0 2px 2px #00000008,0 0 1px #00000008' }}>
                <div className="flex flex-col">
                    <div className="text-gray-500 dark:text-white">Current period usage</div>
                    <div className="flex items-center text-lg font-semibold dark:text-white" title="0">$0.00</div>
                </div>
                <div className="border-r border-gray-100 sm:mx-6 md:mx-10"></div>
                <div className="flex flex-col">
                    <div className="text-gray-500 dark:text-white">Ends on</div>
                    <div className="text-lg font-semibold dark:text-white">Mar 31</div>
                </div>
                <div className="border-r border-gray-100 sm:mx-6 md:mx-10"></div>
            </div>,
    },
    {
        key: '2',
        label: 'Payment information',
        children: <div className='flex flex-col'>
            <div className="flex flex-col rounded-xl border border-gray-100 p-4">
                <h3 className="mb-2 text-xl font-semibold dark:text-white">Payment method</h3>
                <p className="text-gray-600 dark:text-white">There is no payment method for this account.</p>
            </div>
            <button className="btn mt-6 btn border-[rgb(229 231 235)] border-[1px] rounded-md p-2 dark:text-white" title="">Add a payment method</button>
        </div>,
    },
    {
        key: '3',
        label: 'PRO Subscription',
        children: <div className="mt-6 flex flex-col gap-y-6 space-y-2 rounded-xl border border-gray-100 p-4" style={{ boxShadow: '0 5px 5px #00000008,0 2px 2px #00000008,0 0 1px #00000008' }}>
            <div className="overview-card-wrTabComponenter grid py-4 md:grid-cols-4 md:gap-5">
                <div className="flex items-center justify-between px-4 md:col-span-4 md:mb-0">
                    <div>
                        <p className="text-gray-600 dark:text-white">Active Plan</p>
                        <p className="text-xl font-bold dark:text-white">Free</p></div>
                    <a className="btn dark:text-white" href="/subscribe/pro">Upgrade account</a>
                </div>
            </div>
        </div>,
    },
];

const TabComponent: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default TabComponent;