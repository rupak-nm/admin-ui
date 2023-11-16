import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

import { getConnector } from '@/lib/connector';
import { setupNetwork } from '@/lib/wallet';

import { CONNECTOR_KEY } from '@/constant/data';

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback(
    async (networkId?: number, cb?: () => void) => {
      let successfulConnection = true;

      try {
        const connector = getConnector();

        await activate(connector, async (err) => {
          if (networkId && err instanceof UnsupportedChainIdError) {
            const networkSetup = await setupNetwork(networkId);
            if (networkSetup) {
              await activate(connector);
              cb?.();
              return;
            }
          }

          successfulConnection = false;
        });
      } catch (err) {
        successfulConnection = false;
        // console.error(err);
      }

      if (successfulConnection) localStorage.setItem(CONNECTOR_KEY, 'true');
      else localStorage.removeItem(CONNECTOR_KEY);
    },
    [activate]
  );

  const logout = useCallback(() => {
    deactivate();
    localStorage.removeItem(CONNECTOR_KEY);
  }, [deactivate]);

  return { logout, login };
};

export default useAuth;
