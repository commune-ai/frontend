import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import { Select } from 'antd';
import './commune-module.module.css'
import { FaArrowRight } from 'react-icons/fa6';
import ReactFlowBubbleChart from './bubbleReactFlowChart';
import { ValidatorType } from '../api/staking/type';

interface ReactBubbleChartProps {
    data: ValidatorType[];
    darkMode?: boolean;
}

const Items = [
    { value: 'incentive', label: 'Incentive', property: 'incentive' },
    { value: 'dividends', label: 'Dividends', property: 'dividends' },
    { value: 'stake', label: 'Stake', property: 'stake' },
    { value: 'total_stakers', label: 'Total Stakers', property: 'total_stakers' },
];

const ReactBubbleChart: React.FC<ReactBubbleChartProps> = ({ data, darkMode = true }) => {
    const router = useRouter();

    const [chartData, setChartData] = useState<any[]>([]); // State to hold chart data
    const [error, setError] = useState<string>(''); // State to hold error message
    const [displayName, setDisplayName] = useState<string>('Total_stakers');
    const [selectedSubnets, setSelectedSubnets] = useState<number[]>([0]); // State to hold selected subnets, defaulting to 0
    const [isShowReactFlowButton, setIsShowReactFlowButton] = useState(false)

    useEffect(() => {
        try {
            const selectedItem = Items.find(item => item.value === displayName);
            // Filter data by selected subnets
            const filteredData = data.filter(validator => selectedSubnets.includes(validator.subnet_id));
            // Transform filtered data into the format expected by the BubbleChart component
            const transformedData = filteredData.map((validator) => {
                if (selectedItem) {
                    return {
                        label: `${validator.name}(id=${validator.subnet_id})`, // Concatenate name and subnet information
                        value: validator[selectedItem.property as keyof ValidatorType], // Use the selected property
                        color: getBubbleColor(validator.subnet_id), // Get color based on subnet_id
                    };
                }
                // Handle case when no item is selected
                return {
                    label: validator.name,
                    value: 0, // or some default value
                    color: getBubbleColor(validator.subnet_id), // Get color based on subnet_id
                };
            });

            setChartData(transformedData);
            setError(''); // Clear any previous error
        } catch (error) {
            // Catch any errors that occur during data transformation
            setChartData([]); // Set chartData to empty array
            setError('Error processing data. Please check your data format.'); // Set error message
        }
    }, [data, displayName, selectedSubnets]); // Re-run effect when data or display name changes

    const customBubbleClickFunc = (label: string) => {
        const selectedData = data.find(item => item.name === label);
        router.push(`/commune-modules/${selectedData?.key}`);
    };

    const handleItemChange = (value: string) => {
        setDisplayName(value);
    };

    const handleSubnetChange = (value: number[]) => {
        setSelectedSubnets(value);
    };

    // Define bubble colors based on subnet_id
    const getBubbleColor = (subnetId: number) => {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#800080']; // Array of different colors
        return colors[subnetId % colors.length];
    };

    // Define styles based on darkMode
    const chartStyles = {
        textAlign: 'center',
        margin: 'auto',
        color: darkMode ? '#fff' : '#000', // Text color based on darkMode
    } as React.CSSProperties;

    const uniqueSubnets = Array.from(new Set(data.map(validator => validator.subnet_id))); // Get unique subnet_ids
    const subnetOptions = uniqueSubnets.map(subnetId => {
        const subnetName = data.find(validator => validator.subnet_id === subnetId)?.name || `Subnet ${subnetId}`;
        return {
            value: subnetId,
            label: `${subnetName}`
        };
    });

    const handleReactFlowBubbleChart = () => {
        setIsShowReactFlowButton(!isShowReactFlowButton)
    }

    return (
        <>{
            isShowReactFlowButton ?
                <ReactFlowBubbleChart data={data} />
                :
                <div style={chartStyles}>
                    <div className='flex items-center justify-center mx-auto dark:text-[#32CD32]'>
                        <span style={{ color: darkMode ? '#fff' : '#000', fontSize: '32px' }} className='dark:text-[#32CD32]'>{displayName.charAt(0).toUpperCase() + displayName.slice(1)} Bubble Chart</span>
                        {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

                        <Select
                            id='subnet'
                            defaultValue="Total_stakers"
                            style={{ width: 250, marginLeft: '1rem', height: 70 }}
                            labelRender={() => <span className='text-[35px] p-1'>{displayName}</span>}
                            onChange={(selectedOption) => handleItemChange(selectedOption)}
                            options={Items}
                        />
                        <Select
                            mode="multiple"
                            id='subnet'
                            size='large'
                            style={{ width: 700, marginLeft: '1rem', fontSize: '40px', height: 70 }}
                            placeholder="Select Subnets"
                            value={selectedSubnets}
                            onChange={handleSubnetChange}
                            options={subnetOptions}
                        />

                        <button
                            className="border-2 p-2 rounded-lg cursor-pointer dark:text-[#32CD32] ml-4 flex items-center justify-center w-[300px]"
                            onClick={handleReactFlowBubbleChart}
                        >
                            <FaArrowRight className="h-[53px] w-[50px] dark:text-[#32CD32]" />
                            <span style={{ fontSize: '30px' }} className='ml-4'> to ReactFlow</span>
                        </button>

                    </div>

                    <div className='flex items-center justify-center'>
                        <BubbleChart
                            graph={{
                                zoom: 1.05,
                            }}
                            width={1200}
                            height={1300}
                            showLegend={false}
                            padding={1} // Adjust padding as needed
                            valueFont={{
                                size: 20,
                                color: darkMode ? '#fff' : '#000', // Value font color based on darkMode
                            }}
                            labelFont={{
                                size: 24,
                                color: darkMode ? '#fff' : '#000', // Label font color based on darkMode
                            }}
                            bubbleClickFun={customBubbleClickFunc}
                            data={chartData}
                            colorLegend
                        />
                    </div>

                </div>
        }
        </>
    );
};

export default ReactBubbleChart;
