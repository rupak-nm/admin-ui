import { useWeb3React } from '@web3-react/core';
import { FC, useState } from 'react';

import { truncateAddress } from '@/lib/helpers';
import useEagerConnect from '@/hooks/useEagerConnect';

import AccountDetails from '@/components/Header/AccountDetailsPopover';
import WalletModal from '@/components/Header/WalletModal';


import { Icon } from '@/elements/Icon';

import NetworkSwitchDropdown from './NetworkSwitchDropdown';

const Header: FC = () => {
  const [opened, setOpened] = useState(false)

  const { account } = useWeb3React();
  useEagerConnect();


  return (
    <header>
      <div className='wrapper'>
        <a className='logo' href='/'>
          <Icon variant='npm-full-light' size='regular' />
        </a>

        <div className='account'>
          {account && (
            <NetworkSwitchDropdown />
          )}

          {account ? (
            <AccountDetails>
              <button
                className='details'
              >
                {truncateAddress(account)}
                <Icon variant='chevron-down' size='md' />
              </button>
            </AccountDetails>
          ) : (
            <button className='connect' onClick={() => setOpened(true)}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      <WalletModal isOpen={opened} close={() => setOpened(false)} />
    </header>
  );
};

export default Header;
