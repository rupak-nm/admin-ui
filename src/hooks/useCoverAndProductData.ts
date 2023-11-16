import { useEffect, useState } from 'react';

import { mainetAndTestnetChains } from '@/constant/chains';
import { getCoversAndProductsUrl } from '@/constant/data';

const useCoverAndProductData = () => {
  const [data, setData] = useState<CoverData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);

      try {
        const requests = mainetAndTestnetChains.map((chain) => {
          return fetch(getCoversAndProductsUrl(chain));
        });

        const responses = await Promise.all(requests);
        const jsonResponses = await Promise.all(
          responses.map((res) => res.json())
        );

        const _data: CoverData[] = [];
        jsonResponses.map((jsonData) => {
          if (jsonData.data && Array.isArray(jsonData.data)) {
            jsonData.data.map((cover: CoverData) => {
              _data.push({
                ...cover,
                chainId: Number(cover.chainId) as SUPPORTED_CHAIN_TYPE,
              });
            });
          }
        });

        setData(_data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    })();
  }, []);

  return { data, loading };
};

export default useCoverAndProductData;
