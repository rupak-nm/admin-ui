import { registry, utils } from '@neptunemutual/sdk';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useMemo } from 'react';

import invokeContractMethod from '@/lib/contract';
import { getSigner } from '@/lib/wallet';

const useUpdateAndAccrueCycle = ({ coverKey }: { coverKey: string }) => {
  const { library, chainId, account } = useWeb3React();

  const signerOrProvider = useMemo(() => {
    if (!library || !account) return;

    return getSigner(library, account);
  }, [library, account]);

  const getReassurancePoolWeight = useCallback(async () => {
    if (!signerOrProvider || !chainId) return;

    try {
      const reassuranceWeightKey = utils.keyUtil.encodeKeys(
        ['bytes32', 'bytes32'],
        [utils.keyUtil.PROTOCOL.NS.COVER_REASSURANCE_WEIGHT, coverKey]
      );

      const instance = await registry.Store.getInstance(
        chainId,
        signerOrProvider
      );

      const { tx, error } = await invokeContractMethod({
        instance,
        methodName: 'getUint',
        args: [reassuranceWeightKey],
      });

      if (tx) return tx.toString();

      if (error) console.log({ error });
    } catch (error) {
      console.error(error);
    }
  }, [signerOrProvider, chainId, coverKey]);

  const update = useCallback(
    async ({ onSuccess, onError, force = false }: HookMethodArgs) => {
      if (!signerOrProvider || !chainId || !coverKey) return;

      try {
        const instance = await registry.Reassurance.getInstance(
          chainId,
          signerOrProvider
        );
        const reassurancePoolWeight = await getReassurancePoolWeight();

        const methodName = 'setWeight';
        const args = [coverKey, reassurancePoolWeight];
        const { tx, error, estimateGasError } = await invokeContractMethod({
          instance,
          methodName,
          args,
          force,
        });

        if (tx) onSuccess?.(tx);
        if (error || estimateGasError)
          onError?.({
            err: estimateGasError || error || '',
            args,
            methodName,
            gasEstimationError: Boolean(estimateGasError),
          });
      } catch (err) {
        console.error(err);
      }
    },
    [signerOrProvider, chainId, coverKey, getReassurancePoolWeight]
  );

  const accrue = useCallback(
    async ({ onSuccess, onError, force = false }: HookMethodArgs) => {
      if (!signerOrProvider || !chainId || !coverKey) return;

      try {
        const instance = await registry.Vault.getInstance(
          chainId,
          coverKey,
          signerOrProvider
        );

        const methodName = 'accrueInterest';
        const { tx, error, estimateGasError } = await invokeContractMethod({
          instance,
          methodName,
          force,
        });

        if (tx) onSuccess?.(tx);
        if (error || estimateGasError)
          onError?.({
            err: estimateGasError || error || '',
            args: [],
            methodName,
            gasEstimationError: Boolean(estimateGasError),
          });
      } catch (error) {
        console.error(error);
      }
    },
    [chainId, signerOrProvider, coverKey]
  );

  return { update, accrue };
};

export default useUpdateAndAccrueCycle;
