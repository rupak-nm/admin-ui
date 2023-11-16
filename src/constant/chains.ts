import { rpcUrls } from "@/constant/rpc-urls";
import { components } from "@/elements/Icon";

export const chains = [
  {
    chainId: `0x${(56).toString(16)}`,
    chainName: "BNB Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: rpcUrls[56],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  {
    chainId: `0x${(97).toString(16)}`,
    chainName: "BSC Testnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "tBNB",
      decimals: 18,
    },
    rpcUrls: rpcUrls[97],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  {
    chainId: `0x${(137).toString(16)}`,
    chainName: "Polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: rpcUrls[137],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  {
    chainId: `0x${(80001).toString(16)}`,
    chainName: "Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: rpcUrls[80001],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  {
    chainId: `0x${(43113).toString(16)}`,
    chainName: "Fuji",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: rpcUrls[43113],
    blockExplorerUrls: ["https://testnet.snowtrace.io/"],
  },
  {
    chainId: `0x${(84531).toString(16)}`,
    chainName: "Base Goerli",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: rpcUrls[84531],
    blockExplorerUrls: ["https://goerli.basescan.org"],
  },
  {
    chainId: `0x${(5).toString(16)}`,
    chainName: "Goerli",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: rpcUrls[5],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
  {
    chainId: `0x${(4002).toString(16)}`,
    chainName: "Fantom Testnet",
    nativeCurrency: {
      name: "FTM",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: rpcUrls[4002],
    blockExplorerUrls: ["https://testnet.ftmscan.com/"],
  },
  {
    chainId: `0x${(42161).toString(16)}`,
    chainName: "Arbitrum One",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: rpcUrls[42161],
    blockExplorerUrls: ["https://arbiscan.io/"],
  },
  {
    chainId: `0x${(1).toString(16)}`,
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: rpcUrls[1],
    blockExplorerUrls: ["https://etherscan.io"],
  },
];

export const supportedChains: SUPPORTED_CHAIN_TYPE[] = [
  1, 42161, 56, 84531, 80001,
];

// any one mainet & one testnet chain
export const mainetAndTestnetChains: SUPPORTED_CHAIN_TYPE[] = [1, 84531];

export const networkData: Record<
  SUPPORTED_CHAIN_TYPE,
  {
    name: string;
    logo: keyof typeof components;
    explorer: string;
    abbreviation: string;
  }
> = {
  "1": {
    name: "Ethereum Mainnet",
    logo: "ethereum-blue",
    explorer: "https://etherscan.io",
    abbreviation: "ETH",
  },
  "42161": {
    name: "Arbitrum One",
    logo: "arbitrum-round",
    explorer: "https://arbiscan.io",
    abbreviation: "ARB",
  },
  "56": {
    name: "BNB Smart Chain",
    logo: "binance-wallet",
    explorer: "https://bscscan.com",
    abbreviation: "BSC",
  },
  "84531": {
    name: "Base Goerli",
    logo: "base-goerli",
    explorer: "https://goerli.basescan.org",
    abbreviation: "BGO",
  },
  "80001": {
    name: "Mumbai",
    logo: "polygon",
    explorer: "https://mumbai.polygonscan.com/",
    abbreviation: "MUM",
  },
};

export const chainsArray = Object.keys(networkData).map((chain) => {
  const inferredChain = Number(chain) as SUPPORTED_CHAIN_TYPE;
  return {
    chainId: inferredChain,
    name: networkData[inferredChain].name,
    icon: networkData[inferredChain].logo,
  };
});
