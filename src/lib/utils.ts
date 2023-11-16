import { networkData } from '@/constant/chains';

export const handleCopy = async (copyText: string, cb?: () => void) => {
  try {
    await navigator.clipboard.writeText(copyText);
    setTimeout(() => {
      cb?.();
    }, 1000);
  } catch (err) {
    console.error('Unable to copy: ', err);
    if (cb) cb();
  }
};

export const getAddressLink = (
  networkId: SUPPORTED_CHAIN_TYPE,
  account: string
) => networkData[networkId]?.explorer + '/address/' + account;

export function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
