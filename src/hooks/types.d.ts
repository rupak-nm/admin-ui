type SUPPORTED_CHAIN_TYPE = 1 | 42161 | 56 | 84531 | 80001;

/* Liquidities types & interfaces */
interface VaultInfo {
  withdrawalStarts: string;
  withdrawalEnds: string;
  isAccrualComplete: boolean;
}

type Data = {
  chain: SUPPORTED_CHAIN_TYPE;
  vaultInfo: VaultInfo;
  coverInfo: CoverData;
};

/* Cover and product info types */
interface CoverInfo {
  coverKey: string;
  coverName: string;
  projectName: string | null;
  tokenName: string;
  tokenSymbol: string;
  requiresWhitelist: boolean;
  supportsProducts: boolean;
  leverageFactor: string;
  tags: string[];
  about: string;
  parameters: Parameter[];
  blockchains: Blockchain[] | null;
  floor: string;
  ceiling: string;
  reportingPeriod: number;
  cooldownPeriod: number;
  claimPeriod: number;
  minStakeToReport: string;
  stakeWithFee: string;
  initialReassuranceAmount: string;
  reassuranceRate: string;
  links: {
    website: string;
    blog: string;
    twitter: string;
    instagram: string;
    youtube: string;
    facebook: string;
    reddit: string;
    linkedin: string;
  };
  resolutionSources: ResolutionSource[];
  coverInfoUrl: string;
}

interface Parameter {
  parameter: string;
  type: string;
  text: string;
  list?: {
    type: string;
    items: string[];
  };
}

interface Blockchain {
  chainId: number;
  name: string;
}

interface ResolutionSource {
  text: string;
  uri: string;
}

interface ProductInfo {
  coverKey: string;
  productKey: string;
  productName: string;
  requiresWhitelist: boolean;
  efficiency: string;
  tags: string[];
  about: string;
  blockchains: Blockchain[];
  parameters: Parameter[];
  links: {
    website: string;
    discord: string;
    twitter: string;
    github: string;
    blog: string;
    dao: string;
    documentation: string;
  };
  resolutionSources: ResolutionSource[];
  productInfoUrl: string;
}

interface CoverData {
  chainId: SUPPORTED_CHAIN_TYPE;
  coverKey: string;
  coverKeyString: string;
  coverInfo: string;
  coverInfoDetails: CoverInfo;
  productKey: string | null;
  productKeyString: string | null;
  productInfo: string | null;
  productInfoDetails: ProductInfo | Record<string, never>;
  productStatusEnum: string;
  productStatus: number;
  floor: string;
  ceiling: string;
  leverage: string;
  capitalEfficiency: string;
  capacity: string;
  commitment: string;
  availableForUnderwriting: string;
  utilizationRatio: string;
  reassurance: string;
  tvl: string;
  coverageLag: string;
  supportsProducts: boolean;
  requiresWhitelist: boolean;
  minReportingStake: string;
  activeIncidentDate: number;
  reporterCommission: number;
  reportingPeriod: number;
  claimPlatformFee: number;
  isUserWhitelisted: boolean;
  coverInfoUrl: string;
  productInfoUrl: string | null;
}

// eslint-disable-next-line unused-imports/no-unused-vars
interface TableComponentProps {
  dataRow: Data;
  extraData?: Record<string, any>;
}

// eslint-disable-next-line unused-imports/no-unused-vars
interface HookMethodArgs {
  onSuccess?: (_tx: any) => any;
  onError?: (_error: {
    err: string;
    args: string[];
    methodName: string;
    gasEstimationError?: boolean;
  }) => any;
  force?: boolean;
}
