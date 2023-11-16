import { useEffect } from 'react';

import useAuth from '@/hooks/useAuth';

import { CONNECTOR_KEY } from '@/constant/data';

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connectorName = localStorage.getItem(CONNECTOR_KEY);

    if (connectorName) {
      login();
    }
  }, [login]);
};

export default useEagerConnect;
