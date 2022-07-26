import {eachRecursiveFormatAddress} from '../token';
import {ethers} from 'ethers';
const chain_token_address_map = {}

chain_token_address_map[31337] = {
    DAI : "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    UNI : "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    WBTC : "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    USDC : "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    USDT : "0xdac17f958d2ee523a2206206994597c13d831ec7",
    SNX : "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
    COMP : "0xc00e94cb662c3520282e6f5717214004a7f26888",
    WETH : "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    LINK : "0x514910771af9ca656af840dff83e8264ecf986ca",
    AAVE : "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    SUSHI: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
    MATIC: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
    SHIB: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    MANA: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
    LRC: "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd",
    GRT: "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
    BAL: "0xba100000625a3754423978a60c9317c58a424e3d",
    AXS: "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b",
    UMA: "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828",
    ANKR: "0x8290333cef9e6d528dd5618fb97a76f268f3edd4",
    GTC: "0xde30da39c46104798bb5aa3fe8b9e0e1f348163f",
    OXT: "0x4575f41308EC1483f3d399aa9a2826d74Da13Deb",
    SKL: "0x00c83aecc790e8a4453e5dd3b0b4b3680501a7a7",
    SAND: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
    STORJ: "0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac"
  };

  chain_token_address_map[42] = {
    DAI : "0x04d8a950066454035b04fe5e8f851f7045f0e6b3",
    UNI : "",
    WBTC : "",
    USDC : "",
    USDT : "",
    SNX : "",
    COMP : "",
    WETH : "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
    LINK : "0xa36085f69e2889c224210f603d836748e7dc0088",
    AAVE : "",
    SUSHI: "",
    MATIC: "",
    SHIB: "",
    MANA: "",
    LRC: "",
    GRT: "",
    BAL: "",
    AXS: "",
    UMA: "",
    ANKR: "",
    GTC: "",
    OXT: "",
    SKL: "",
    SAND: "",
    STORJ: ""
  };






  async function RecursiveAddressVerifier(obj)
  {
      for (var k in obj)
      {
          if (obj[k]) {
            if (typeof obj[k] == "object")
                eachRecursiveFormatAddress(obj[k]);
            if (typeof obj[k] == "string")
                obj[k] = ethers.utils.getAddress(obj[k])
          } else 
          {
            if (typeof obj[k] == 'string') {
              obj.delete(k )
            }
          }
      }
  }
  
RecursiveAddressVerifier(chain_token_address_map);

export default chain_token_address_map