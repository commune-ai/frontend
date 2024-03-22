import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { ApiPromise, WsProvider } from '@polkadot/api';

import classes from './navigation-bar.module.css';
import type { MenuProps } from 'antd';
import { Dropdown, Modal, Space, Select } from 'antd';
import Image from "next/image";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MetaMaskImage from '../../../../public/svg/metamask.svg'
import { useSendTransaction, useContractWrite } from 'wagmi'
import { parseEther } from 'viem'
import axios from "axios";
import * as  erc20ContractABI from '../../../services/token_abi.json';
import { saveTransaction } from "@/store/action/transaction.record.action";




export default function MetaBalance() {

    const [destinationAddress, setDestinationAddress] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [tokenType, setTokenType] = React.useState('')
    const [selectedChain, setSelectedChain] = React.useState('')


    const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
    const { abi: erc20ABI } = erc20ContractABI

    const router = useRouter();

    const handleChange = (value: string) => {
        setTokenType(value)
    };

    const { data: hash, sendTransaction } = useSendTransaction()

    //This Function must be used in Client side.
    const createBTCTx = async (toAddress: string, value: number, env: string, fromAddress: string) => {
        try {
            // const { toAddress, value, env, fromAddress } = data;
            const valueInSatoshi = value * 100000000;
            // console.log(valueInSatoshi);
            // console.log("Vivek bhai ",toAddress, value, env, fromAddress);
            if (!fromAddress || !toAddress || !value || !env) {
                return {
                    code: 0,
                    message: "invalid/insufficient parameters"
                }
            }
            let url;
            if (env == 'testnet') {
                url = 'https://api.blockcypher.com/v1/btc/test3/txs/new'
            }
            else if (env == 'mainnet') {
                url = 'https://api.blockcypher.com/v1/btc/main/txs/new'
            }
            else {
                return {
                    code: 0,
                    message: 'Invalid env'
                }
            }
            let data = JSON.stringify({
                "inputs": [
                    {
                        "addresses": [
                            `${fromAddress}`  /* "n1TKu4ZX7vkyjfvo7RCbjeUZB6Zub8N3fN" */
                        ]
                    }
                ],
                "outputs": [
                    {
                        "addresses": [
                            `${toAddress}` /* "2NCY42y4mbvJCxhd7gcCroBEvVh1dXkbPzA"
 */                    ],
                        "value": valueInSatoshi
                    }
                ]
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.blockcypher.com/v1/btc/test3/txs/new',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios.request(config)
                .then((response) => {
                    // console.log("Tushar",JSON.stringify(response.data));
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
            // console.log(response.status);
            if (response?.status != 201) {
                return {
                    code: 0,
                    message: response?.data?.error
                }
            }
            return {
                code: 1,
                result: response.data
            }

        } catch (error) {
            console.log('error generating btc tx', error);
            return {
                code: 0,
                message: error,
            };
        }

    }

    const { data: txHashUSDT, write: paywithUSDT } = useContractWrite({
        address: '0x28B3071bE7A6E4B3bE2b36D78a29b6e4DbBdDb74',
        abi: erc20ABI,
        functionName: 'transfer'
    })

    const { data: txHashUSDC, write: paywithUSDC } = useContractWrite({
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        abi: erc20ABI,
        functionName: 'transfer'
    })

    const handlePayWithWallet = () => {
        if (tokenType === 'eth') {

            sendTransaction({ to: destinationAddress, value: parseEther(amount) })
        }
        if (tokenType === 'matic') {
            if (selectedChain !== 'Polygon') {
                window.alert('Please change your chain to Polygon')
            } else {
                sendTransaction({ to: destinationAddress, value: parseEther(amount) })
            }
        }
        if (tokenType === 'usdt') {

            paywithUSDT({ args: [destinationAddress, amount] });

        }
        if (tokenType === 'usdc') {

            paywithUSDC({ args: [destinationAddress, amount] });

        }
        if (tokenType === 'bitcoin') {
            const transfer = async (
                privateKey: string,
                value: number,
                receiver: string,
                env: string,
                address: string,
                ecc: any,
            ) => {
                try {
                    const createTxResponse = await createBTCTx(receiver, value, env, address);
                    if (createTxResponse?.code != 1) return createTxResponse;
                    const tx = createTxResponse.result.tx;
                    const toSign = createTxResponse.result.tosign;

                } catch (error) {
                    return {
                        code: 0,
                        error,
                    };
                }
            };
        }
    }

    if (hash || txHashUSDT || txHashUSDC) {

        let selectedHash = hash || txHashUSDT || txHashUSDC;

        if (selectedHash) {
            saveTransaction(tokenType, parseFloat(amount), destinationAddress, selectedHash.hash);
        }

    }


    const [api, setApi] = React.useState<ApiPromise | null>(null);
    const [chainInfo, setChainInfo] = React.useState('');
    const [nodeName, setNodeName] = React.useState('');

    React.useEffect(() => {
        const connectToSubstrate = async () => {
            const provider = new WsProvider('wss://rpc.polkadot.io');
            const substrateApi = await ApiPromise.create({ provider });
            setApi(substrateApi);
        };

        connectToSubstrate();
    }, []);


    return (

        <div>
            <div className="flex flex-col">
                <label className="mt-2">Receiver:</label>
                <input value={destinationAddress} onChange={({ target: { value } }) => setDestinationAddress(value)} style={{ padding: '0.3rem' }} className="mt-2" placeholder="Please input wallet address" />
                <div className="flex items-center mt-4">
                    <label style={{ marginRight: '0.3rem' }}>PayType:</label>
                    <Space wrap>
                        <Select
                            defaultValue="ETH"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            options={[
                                { value: 'eth', label: 'ETH' },
                                { value: 'matic', label: 'MATIC' },
                                { value: 'usdt', label: 'USDT' },
                                { value: 'usdc', label: 'USDC' },
                                // { value: 'bitcoin', label: 'BTC' },
                            ]}
                        />
                    </Space>
                    <label className="ml-auto mr-2">Amount:</label>
                    <input type="number" value={amount} onChange={({ target: { value } }) => setAmount(value)} style={{ padding: '0.3rem' }} />
                </div>

                <ConnectButton.Custom>
                    {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                    }) => {
                        // Note: If your app doesn't use authentication, you
                        // can remove all 'authenticationStatus' checks
                        const ready = mounted && authenticationStatus !== 'loading';
                        setSelectedChain(chain?.name || '');
                        const connected =
                            ready &&
                            account &&
                            chain &&
                            (!authenticationStatus ||
                                authenticationStatus === 'authenticated');

                        return (
                            <div
                                {...(!ready && {
                                    'aria-hidden': true,
                                    'style': {
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                    },
                                })}
                            >
                                {(() => {
                                    if (!connected) {
                                        return (
                                            <div className='flex items-center justify-center mt-3 bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer' onClick={openConnectModal}>
                                                <button type="button">
                                                    Connect Wallet
                                                </button>
                                                <Image src={MetaMaskImage} alt='login with Metamask' width={32} height={32} className='cursor-pointer ml-3' />
                                            </div>
                                        );
                                    }

                                    if (chain.unsupported) {
                                        return (
                                            <button onClick={openChainModal} type="button" style={{ boxShadow: 'rgb(0 0 0 / 98%) 3px 3px 3px 3px' }}>
                                                Wrong network
                                            </button>
                                        );
                                    }

                                    return (
                                        <div style={{ display: 'flex', gap: 12 }} className='flex items-center flex-col justify-center'>
                                            <button
                                                onClick={openChainModal}
                                                style={{ display: 'flex', alignItems: 'center' }}
                                                type="button"
                                            >
                                                {chain.hasIcon && (
                                                    <div
                                                        style={{
                                                            background: chain.iconBackground,
                                                            width: 12,
                                                            height: 12,
                                                            borderRadius: 999,
                                                            overflow: 'hidden',
                                                            marginRight: 4,
                                                        }}
                                                    >
                                                        {chain.iconUrl && (
                                                            <img
                                                                alt={chain.name ?? 'Chain icon'}
                                                                src={chain.iconUrl}
                                                                style={{ width: 12, height: 12 }}
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                                {chain.name}
                                            </button>

                                            <button type="button" style={{ color: 'darkcyan' }} onClick={handlePayWithWallet}>
                                                Pay with Wallet
                                            </button>

                                            <button onClick={openAccountModal} type="button">
                                                {account.displayName}
                                                {account.displayBalance
                                                    ? ` (${account.displayBalance})`
                                                    : ''}
                                            </button>

                                        </div>
                                    );
                                })()}
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
            </div>


        </div>

    );
}