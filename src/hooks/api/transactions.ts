import axios from '@/config/axios';
import { WALLET_TX_HISTORY } from '@/lib/constants';
import { useExplorerStore } from '@/store/useExplorerStore';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { EvmWalletHistoryJSON } from 'moralis/common-evm-utils';

/**
 * Get wallet tx history
 */
export const useWalletTxHistoryQuery = (address: string, dependsOn = true) => {
  const { setTransactions } = useExplorerStore();
  const fetchWalletTxHistoryQuery = async () => {
    const { data } = await axios.get<EvmWalletHistoryJSON>(
      `/wallets/${address}/history`
    );
    return data;
  };

  function onSuccess(resp?: EvmWalletHistoryJSON) {
    if (!!resp?.result.length) {
      setTransactions(resp);
    }
  }

  function onError(error: AxiosError) {}

  return useQuery({
    queryKey: [WALLET_TX_HISTORY, address],
    queryFn: fetchWalletTxHistoryQuery,
    onSuccess,
    onError,
    retry: 0,
    cacheTime: 0,
    enabled: dependsOn,
  });
};
