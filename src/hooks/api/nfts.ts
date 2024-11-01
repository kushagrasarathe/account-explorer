import axios from '@/config/axios';
import { WALLET_NFT_HOLDINGS } from '@/lib/constants';
import { useExplorerStore } from '@/zustand/useExplorerStore';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetWalletNFTsJSONResponse } from 'moralis/common-evm-utils';

/**
 * Get nft holdings
 */
export const useNFTHoldingsQuery = (address: string, dependsOn = true) => {
  const { setNFTHoldings } = useExplorerStore();

  const fetchWalletNFTHoldings = async () => {
    const { data } = await axios.get<GetWalletNFTsJSONResponse>(
      `/${address}/nft`
    );
    return data;
  };

  function onSuccess(resp?: GetWalletNFTsJSONResponse) {
    if (!!resp?.result.length) {
      setNFTHoldings(resp);
    }
  }

  function onError(error: AxiosError) {}

  return useQuery({
    queryKey: [WALLET_NFT_HOLDINGS, address],
    queryFn: fetchWalletNFTHoldings,
    onSuccess,
    onError,
    retry: 0,
    cacheTime: 0,
    enabled: dependsOn,
  });
};
