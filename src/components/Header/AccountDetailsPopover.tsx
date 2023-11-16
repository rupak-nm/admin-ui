import * as Popover from '@radix-ui/react-popover';
import { useWeb3React } from '@web3-react/core';
import { ReactNode } from 'react';

import { truncateAddress } from '@/lib/helpers';
import { getAddressLink, handleCopy } from '@/lib/utils';
import useAuth from '@/hooks/useAuth';

import { Icon } from '@/elements/Icon';

const AccountDetails = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { logout } = useAuth();
  const { account, chainId } = useWeb3React();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className='PopoverContent' align='end' sideOffset={8} side='bottom'>
          <div className='dropdown content'>
            <div className='item'>
              {truncateAddress(account || '')}

              <button
                className='copy'
                onClick={async () => {
                  handleCopy(account || '');
                }}
              >
                <Icon variant='copy-01' size='md' />
              </button>
            </div>

            <div className='item'>
              View on Explorer
              <a
                className='link'
                href={
                  chainId && account
                    ? getAddressLink(chainId as SUPPORTED_CHAIN_TYPE, account)
                    : ''
                }
                target='_blank'
              >
                <Icon variant='link-external-01' size='md' />
              </a>
            </div>

            <button
              className='logout'
              onClick={() => {
                logout();
              }}
            >
              <div className='text'>
                <Icon variant='log-out-01' size='lg' />
                <span className='text'>Logout</span>
              </div>
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AccountDetails;
