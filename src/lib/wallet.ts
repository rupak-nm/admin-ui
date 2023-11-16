import { chains } from '@/constant/chains';

export const getEthereumProvider = () => {
  if (typeof window === 'undefined' || !window || !window.ethereum) {
    return undefined;
  }

  return window.ethereum;
};

const getNetworkParams = (networkId: number) => {
  return chains.find((x) => {
    return x.chainId === `0x${networkId.toString(16)}`;
  });
};

export const setupNetwork = async (networkId: number) => {
  const provider = getEthereumProvider();

  if (!provider) {
    console.error("Can't setup network - injected provider not found");

    return false;
  }

  if (!getNetworkParams(networkId)) return false;

  try {
    await provider?.request?.({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: getNetworkParams(networkId)?.chainId }],
    });

    return true;
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      return addChain(networkId);
    }
    // handle other "switch" errors
    console.error(switchError);
  }

  return false;
};

export const addChain = async (networkId: number) => {
  const provider = getEthereumProvider();

  if (!provider) {
    console.error("Can't setup network - injected provider not found");

    return false;
  }

  try {
    await provider?.request?.({
      method: 'wallet_addEthereumChain',
      params: [getNetworkParams(networkId)],
    });

    return true;
  } catch (addError) {
    // handle "add" error
    console.error(addError);
  }

  return false;
};

export const getSigner = (library: any, account: string) => {
  return library.getSigner(account).connectUnchecked();
};
