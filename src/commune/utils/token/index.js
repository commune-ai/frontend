/* global BigInt */

import {ethers} from 'ethers'
import IERC20 from '../../../artifacts/interfaces/IERC20';


 async function eachRecursiveFormatAddress(obj)
{
    for (var k in obj)
    {
        if (typeof obj[k] == "object" && obj[k] !== null)
            eachRecursiveFormatAddress(obj[k]);
        if (typeof obj[k] == "string")
            obj[k] = ethers.utils.getAddress(obj[k])
    }
}


async function decodeERC20Amount(tokenAddress,tokenAmount, provider) 
{
    const tokenContract = new ethers.Contract(tokenAddress, IERC20.abi, provider)
    const decimals =  await tokenContract.decimals();
    return ethers.utils.formatUnits(tokenAmount, decimals)
}
    

async function encodeERC20Amount(tokenAddress,tokenAmount, provider) {
    const tokenContract = new ethers.Contract(tokenAddress, IERC20.abi, provider)
    const decimals = await tokenContract.decimals();
    return BigInt(tokenAmount * 10 ** decimals)

}
 

async function getTokenContractMap(tokenAddressMap, provider, ethers) {  
    var tokenContractMap = {}
    for (var token_key in tokenAddressMap)
    {
        const token_address = tokenAddressMap[token_key]

        // const abi = [
        //     "function balanceOf(walletAddress) view returns (uint256)",
        //     "function decimals() view returns (uint256)"
        //   ];
        tokenContractMap[token_key] = new ethers.Contract(token_address, IERC20.abi, provider)
    }
    return tokenContractMap
}


 export {eachRecursiveFormatAddress, getTokenContractMap, decodeERC20Amount, encodeERC20Amount}