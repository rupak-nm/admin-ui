'use client';

import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { ReactNode } from 'react';

import ErrorBoundary from 'elements/ErrorBoundary/index'

const Providers = ({ children }: { children: ReactNode }) => {
  const getLibrary = (provider: any) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

  return (
    <ErrorBoundary>
      <Web3ReactProvider getLibrary={getLibrary}>
        {children}
      </Web3ReactProvider>
    </ErrorBoundary>
  );
};

export default Providers;
