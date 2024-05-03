"use client"
import React, { useEffect, useState } from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import { useParams, useRouter } from 'next/navigation';
import './commune-module.module.css'
import { ValidatorType } from '@/types';
import { useGetValidatorsByIdQuery } from '@/app/api/staking/modulelist';

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

const StakePage: React.FC<ReactBubbleChartProps> = ({ darkMode = true }) => {

    const params = useParams()
    const { data: validatorData, isLoading: validatorLoading } =
        useGetValidatorsByIdQuery(
            {
                key: String(params.id),
                wallet: "",
                subnet_id: Number(params.subnetId),
            },
            {
                skip: !params.id,
            },
        )

    const [chartData, setChartData] = useState<any[]>([]); // State to hold chart data
    const [error, setError] = useState<string>(''); // State to hold error message
    const [displayName, setDisplayName] = useState<string>('Total_stakers');
    const [selectedSubnets, setSelectedSubnets] = useState<number[]>([0]); // State to hold selected subnets, defaulting to 0

    useEffect(() => {
        try {
            // Filter data by selected subnets
            // Transform filtered data into the format expected by the BubbleChart component
            const transformedData = validatorData?.stake_from?.slice(0, 100).map((validator, index) => {
                return {
                    label: `${validator[0]}(id=${validatorData.subnet_id})`, // Concatenate name and subnet information
                    value: validator[1], // Use the selected property
                    color: getBubbleColor(validator[1]), // Get color based on subnet_id
                };
            });

            if (transformedData) {
                setChartData(transformedData);
            }
            setError(''); // Clear any previous error
        } catch (error) {
            // Catch any errors that occur during data transformation
            setChartData([]); // Set chartData to empty array
            setError('Error processing data. Please check your data format.'); // Set error message
        }
    }, [validatorData, displayName, selectedSubnets]); // Re-run effect when data or display name changes

    const customBubbleClickFunc = (label: string) => {
        // const selectedData = validatorData?.find(item => item.name === label);
        // router.push(`/commune-modules/${selectedData?.key}`);
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

    return (
        <>
            <div style={chartStyles} className='mt-4'>
                <div className='flex items-center justify-center mx-auto flex-col mt-4'>
                    <span style={{ color: darkMode ? '#fff' : '#000', fontSize: '32px' }}>Staker Bubble Chart</span>
                    <span style={{ fontSize: '35px' }} className='ml-4'>{validatorData?.name}</span>
                </div>

                <div className='flex items-center justify-center'>
                    <BubbleChart
                        graph={{
                            zoom: 1.05,
                        }}
                        width={1300}
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
        </>
    );
};

export default StakePage;
