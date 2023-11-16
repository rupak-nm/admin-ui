import { InjectedConnector } from '@web3-react/injected-connector';

export const getConnector = (chainId?: number) => {
  return new InjectedConnector({
    supportedChainIds: chainId ? [chainId] : undefined,
  });
};
