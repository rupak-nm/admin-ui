import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import BN from 'bignumber.js';

import { getErrorMessage } from '@/lib/error-message';

import { DEFAULT_GAS_LIMIT, GAS_MARGIN_MULTIPLIER } from '@/constant/data';

BN.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const calculateGasMargin = (value: string | number | BigNumber) => {
  return new BN(value.toString())
    .multipliedBy(GAS_MARGIN_MULTIPLIER)
    .decimalPlaces(0)
    .toString();
};

const invokeContractMethod = async ({
  instance,
  methodName,
  args = [],
  overrides,
  read = false,
  force = false,
}: {
  instance: Contract;
  methodName: string;
  args?: string[];
  overrides?: Record<any, any>;
  read?: boolean;
  force?: boolean;
}) => {
  if (!instance) {
    return { error: 'Invalid instance' };
  }

  let estimatedGas: BigNumber | null = null;

  try {
    if (!force) estimatedGas = await instance.estimateGas[methodName](...args);

    try {
      const tx = await instance[methodName](...args, {
        gasLimit: force
          ? DEFAULT_GAS_LIMIT
          : estimatedGas
          ? calculateGasMargin(estimatedGas)
          : undefined,
        ...overrides,
      });

      return { tx };
    } catch (error) {
      console.log(`Could not call ${methodName} function with args:`, args);
      return { error: getErrorMessage(error, instance) };
    }
  } catch (err) {
    console.log(`Could not estimate gas for "${methodName}", args: `, args);
    return read
      ? { error: getErrorMessage(err, instance) }
      : { estimateGasError: getErrorMessage(err, instance) };
  }
};

export default invokeContractMethod;
