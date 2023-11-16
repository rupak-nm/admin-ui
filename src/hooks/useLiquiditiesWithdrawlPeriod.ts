import { useCallback, useEffect, useMemo, useState } from 'react';

import useCoverAndProductData from '@/hooks/useCoverAndProductData';

import { LIQUIDITY_CYCLES_URL } from '@/constant/data';

const useLiquiditiesWithdrawlPeriod = () => {
  const [fetching, setFetching] = useState(false);

  const [vaultData, setVaultData] = useState<
    Array<{
      chainId: SUPPORTED_CHAIN_TYPE;
      coverKey: string;
      withdrawalEnds: string;
      withdrawalStarts: string;
      isAccrualComplete: boolean;
    }>
  >([]);

  const { data: coversData, loading: fetchingCovers } =
    useCoverAndProductData();

  const updateVaultData = useCallback(async () => {
    setFetching(true);

    try {
      const url = LIQUIDITY_CYCLES_URL;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.data) {
        setVaultData(data.data);
      }
    } catch (error) {
      console.error(error);
    }

    setFetching(false);
  }, []);

  useEffect(() => {
    if (updateVaultData) updateVaultData();
  }, [updateVaultData]);

  const liquidities: Data[] = useMemo(() => {
    return vaultData.flatMap((vault) => {
      const cover = coversData.find(
        (c) =>
          c.chainId === Number(vault.chainId) && c.coverKey === vault.coverKey
      );
      if (cover) {
        return [
          {
            chain: cover.chainId,
            coverInfo: cover,
            vaultInfo: {
              withdrawalStarts: vault.withdrawalStarts,
              withdrawalEnds: vault.withdrawalEnds,
              isAccrualComplete: vault.isAccrualComplete,
            },
          },
        ];
      }

      return [];
    });
  }, [vaultData, coversData]);

  return {
    liquidities,
    fetching: fetching || fetchingCovers,
    updateData: updateVaultData,
  };
};

export default useLiquiditiesWithdrawlPeriod;
