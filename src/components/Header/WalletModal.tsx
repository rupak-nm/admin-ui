import { useWeb3React } from '@web3-react/core';

import useAuth from '@/hooks/useAuth';

import { Icon } from '@/elements/Icon';
import { Modal } from '../Modal/Modal';

const links = {
  tnc: 'https://docs.atlasswap.com/usage/terms-of-use',
  disclaimer: 'https://docs.atlasswap.com/usage/disclaimer',
};
const WalletModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const { login } = useAuth();
  const { account } = useWeb3React();

  return (
    <Modal
      visible={!account && isOpen}
      setVisible={() => close()}
      className='wallet modal'
      title={(
        <>
          <div className='wallet icon'>
            <Icon variant='wallet-03' size='xl' />
          </div>

          <h1>Connect Wallet</h1>
        </>
      )}
      showCloseButton
    >
      <div className='description'>
        <p>
          By connecting a wallet, you agree to Neptune Mutual{' '}
          <a href={links.tnc} target='_blank'>
            Terms & Conditions
          </a>{' '}
          and acknowledge that you have read and understand the Neptune Mutual{' '}
          <a href={links.disclaimer} target='_blank'>
            Protocol Disclaimer
          </a>
          .
        </p>
      </div>

      <button
        className='wallet'
        onClick={() => {
          login();
          close();
        }}
      >
        <Icon variant='metamask' size='xl' />
        Metamask
      </button>
    </Modal>
  );
};

export default WalletModal;
