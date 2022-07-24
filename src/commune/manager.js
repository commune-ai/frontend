/* global BigInt */
import BackendAPI from './api/backend.js'
import {chain_token_address_map} from './utils/address'
import {deepMapGet, deepMapSet} from './utils/types/map.js'
import {ethers} from 'ethers';
// import abi_map from "../artifacts/abi_map.json";
import IERC20 from "../artifacts/interfaces/IERC20.json"
// import  global_contract_info from "../artifacts/meta/global_contract_info.json";

class Manager  {
    constructor() {
        this.api = new BackendAPI()

    }

    async setup(provider){
        provider = ethers.getDefaultProvider('http://localhost:8545')
        this.chainId= (await provider.getNetwork()).chainId
        // console.log("SIGNER", provider.getSigner())
        this.provider = provider
        this.token_address_map = chain_token_address_map[this.chainId]
    }

    signer() {
        const private_key = "bbfbee4961061d506ffbb11dfea64eba16355cbf1d9c29613126ba7fec0aed5d"
        return new ethers.Wallet(private_key, this.provider)
        // return  this.provider.getSigner()

    }


    getContractABI(contractName)
    {
        // const contractKeyPath = `${contractName}`
        // return deepMapGet(contractKeyPath, abi_map)

    }


    getContractFromAddress(contractName, contractAddress) {  
        const contractABI = this.getContractABI(contractName)
        
        return new ethers.Contract(contractAddress, 
            contractABI,
            this.signer())   
    }


    async getContractFromAlias(name=null, version="v0", alias=null) {   

        // const contract_info = deepMapGet(`${this.chainId}.${name}.${version}.${alias}`, global_contract_info)
        // const contractAddress = contract_info.address
        // const contractABI = abi_map[contract_info.name]
        // return new ethers.Contract(contractAddress, 
        //                 contractABI,
        //                 this.signer())   
    }


    async getToken(tokenSymbol) {

        const tokenAddress = this.token_address_map[tokenSymbol]
        return new ethers.Contract(tokenAddress, IERC20.abi, this.signer())
    }

    async transfer(tokenSymbol,_toAddress, tokenAmount) {
        const tokenContract = await this.getToken(tokenSymbol)
        const encodedTokenAmount = await this.encodeAmount(tokenAmount, tokenSymbol)
        const tx = await tokenContract.transfer(_toAddress, encodedTokenAmount)

        return tx
    }

    async approve(tokenSymbol,_toAddress, tokenAmount) {
        const tokenContract = await this.getToken(tokenSymbol)
        const encodedTokenAmount = await this.encodeAmount(tokenAmount, tokenSymbol)
        const tx = await tokenContract.approve(_toAddress, encodedTokenAmount)
        return tx
    }

    async allowance(tokenSymbol,_toAddress) {
        const tokenContract = await this.getToken(tokenSymbol)
        let tokenAllowance = await tokenContract.allowance(this.signer().address, _toAddress)
        tokenAllowance = await this.decodeAmount(tokenAllowance, tokenSymbol)
        return tokenAllowance
    }
 
    async getBalance(tokenSymbol, address = null){

        if (!address) {
            address = this.signer().address
        }

        let balance_value

        if (tokenSymbol == 'ETH' && address == this.signer().address) {
            balance_value = await this.signer().getBalance()
        } else {
            const tokenContract = await this.getToken(tokenSymbol)
            balance_value = await tokenContract.balanceOf(address)

        }

        return await this.decodeAmount(balance_value, tokenSymbol)
        

    }

    async  decodeAmount(tokenAmount, tokenSymbol='ETH') 
    {
        if (tokenSymbol == 'ETH') {
            return ethers.utils.formatUnits(tokenAmount, 'ether')
        }
        const tokenContract = await this.getToken(tokenSymbol)
        const decimals =  await tokenContract.decimals();
        return ethers.utils.formatUnits(tokenAmount, decimals)
    }
        
    async  encodeAmount(tokenAmount,tokenSymbol='ETH') {
        if (tokenSymbol == 'ETH') {
            return ethers.utils.parseUnits(tokenAmount, 'ether')
        }
        const tokenContract = await this.getToken(tokenSymbol)
        const decimals = await tokenContract.decimals();
        return BigInt(tokenAmount * 10 ** decimals)
    }

    async requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    async connect() {
        // await this.requestAccount()
        
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        let provider = null
        await this.setup(provider )
      }

}



export default Manager