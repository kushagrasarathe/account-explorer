import axios from '@/config/axios';
import {
  WALLET_NET_WORTH,
  WALLET_STATS,
  WALLET_TX_HISTORY,
} from '@/lib/constants';
import { useExplorerStore } from '@/zustand/useExplorerStore';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  EvmNetWorthResultJSON,
  EvmWalletHistoryJSON,
  EvmWalletStatJSON,
} from 'moralis/common-evm-utils';

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

export const useWalletNetWorthQuery = (address: string, dependsOn = true) => {
  const { setNetWorth } = useExplorerStore();

  const fetchWalletNetworth = async () => {
    const { data } = await axios.get<EvmNetWorthResultJSON>(
      `/wallets/${address}/net-worth`
    );
    return data;
  };

  function onSuccess(resp?: EvmNetWorthResultJSON) {
    if (!!resp?.total_networth_usd) {
      setNetWorth(resp);
    }
  }

  function onError(error: AxiosError) {}

  return useQuery({
    queryKey: [WALLET_NET_WORTH, address],
    queryFn: fetchWalletNetworth,
    onSuccess,
    onError,
    retry: 0,
    cacheTime: 0,
    enabled: dependsOn,
  });
};

export const useWalletStatsQuery = (address: string, dependsOn = true) => {
  const { setWalletStats } = useExplorerStore();

  const fetchWalletStats = async () => {
    const { data } = await axios.get<EvmWalletStatJSON>(
      `/wallets/${address}/stats`
    );
    return data;
  };

  function onSuccess(resp?: EvmWalletStatJSON) {}

  function onError(error: AxiosError) {}

  return useQuery({
    queryKey: [WALLET_STATS, address],
    queryFn: fetchWalletStats,
    onSuccess,
    onError,
    retry: 0,
    cacheTime: 0,
    enabled: dependsOn,
  });
};
