"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import { useGetValidatorsByIdQuery } from '@/app/api/staking/modulelist';
import './commune-module.module.css'

const StakePage = () => {

    const darkMode = true
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
    console.log('---------------', error, setDisplayName, setSelectedSubnets);

    useEffect(() => {
        try {
            // Filter data by selected subnets
            // Transform filtered data into the format expected by the BubbleChart component
            const transformedData = validatorData?.stake_from?.slice(0, 100).map((validator, index) => {
                console.log('-----------', index);

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
        <>{validatorData ? <div style={chartStyles} className='mt-4'>
            <div className='flex items-center justify-center mx-auto flex-col mt-4'>
                <span style={{ fontSize: '32px' }} className='dark: text-[#32CD32]'>Staker Bubble Chart</span>
                <span style={{ fontSize: '35px' }} className='ml-4 dark: text-[#32CD32]'>{validatorData?.name}</span>
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
                        color: darkMode ? '#32CD32' : '#000', // Value font color based on darkMode
                    }}
                    labelFont={{
                        size: 24,
                        color: darkMode ? '#32CD32' : '#000', // Label font color based on darkMode
                    }}
                    data={chartData}
                    colorLegend
                />
            </div>

        </div>
            :
            <div className='flex items-center justify-center mx-auto flex-col mt-4'>
                <span style={{ color: darkMode ? '#fff' : '#000', fontSize: '32px' }}>Staker Bubble Chart</span>
                <span className='mt-10'>There is no data to display</span>
            </div>
        }

        </>
    );
};

export default StakePage;
