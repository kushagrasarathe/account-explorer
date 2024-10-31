import axios from '@/config/axios';
import { WALLET_TX_HISTORY } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * Get wallet tx history
 */
export const useWalletTxHistoryQuery = (address: string, dependsOn = true) => {
  const fetchWalletTxHistoryQuery = async () => {
    const { data } = await axios.get<any>(`/wallets/${address}/history`);
    return data;
  };

  function onSuccess(resp?: any) {
    console.log(resp);
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
