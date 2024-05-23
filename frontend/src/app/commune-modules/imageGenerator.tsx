import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { Prediction } from 'replicate';
import { ValidatorType } from '@/types';

interface Props {
    module?: ValidatorType;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ImageGeneratorComponent: React.FC<Props> = ({ module }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(module?.description || null);
    const [prediction, setPrediction] = useState<Prediction | null>(null);

    const fetchDescription = useCallback(async (name: string) => {
        try {
            const response = await axios.post('/api/generate-description', { name });
            if (response.status === 200) {
                setDescription(response.data.description);
            } else {
                setError('Failed to generate description');
            }
        } catch (error) {
            console.error('Error fetching description:', error);
            setError('Error fetching description');
        }
    }, []);

    const generatePrediction = useRef(
        debounce(async (module: ValidatorType, description: string) => {
            if (module && !module.image && description) {
                try {
                    const response = await fetch('/api/predictions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ prompt: description }),
                    });

                    let prediction = await response.json();
                    if (response.status !== 201) {
                        setError(prediction.error ?? 'An error occurred');
                        return;
                    }

                    while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
                        await sleep(1000);
                        const response = await fetch('/api/predictions/' + prediction.id);
                        prediction = await response.json();
                        if (response.status !== 200) {
                            setError(prediction.error ?? 'An error occurred');
                            return;
                        }
                        setPrediction(prediction);
                    }

                    if (prediction.status === 'succeeded' && prediction.output) {
                        setImageUrl(prediction.output[prediction.output.length - 1]);
                    }

                } catch (error) {
                    console.error('Error generating prediction:', error);
                }
            }
        }, 300)
    ).current;

    useEffect(() => {
        if (module && !module.description && module.name) {
            fetchDescription(module.name);
        }
    }, [module, fetchDescription]);

    useEffect(() => {
        if (module && description) {
            generatePrediction(module, description);
        }
    }, [module, description, generatePrediction]);

    const finalImageUrl = module?.image
        ? `${process.env.NEXT_PUBLIC_ENDPOINT}/${module.image}`
        : imageUrl;

    return (
        <div className={`h-[340px] w-[340px] ${finalImageUrl ? '' : 'bg-slate-200'} flex justify-center items-center rounded-3xl mx-auto`}
            style={{
                backgroundImage: finalImageUrl ? `url(${finalImageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {!finalImageUrl && module?.name}
        </div>
    );
};

export default ImageGeneratorComponent;
