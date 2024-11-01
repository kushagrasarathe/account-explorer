'use client';

import { useNFTHoldingsQuery } from '@/hooks/api/nfts';
import { useWalletTxHistoryQuery } from '@/hooks/api/transactions';
import { useExplorerStore } from '@/store/useExplorerStore';
import React from 'react';

export default function AddressWrapper({
  children,
}: React.PropsWithChildren<{}>) {
  const { currentAddress, transactions, nftHoldings } = useExplorerStore();

  const triggerTxsQuery = !!currentAddress && !transactions;
  const triggerNFTQuery = !!currentAddress && !nftHoldings;

  const { data: walletTxns, isFetching: isFetchingWalletTxns } =
    useWalletTxHistoryQuery(currentAddress as string, triggerTxsQuery);

  const { data: nftHoldingsData, isFetching: isFetchingWalletNFTs } =
    useNFTHoldingsQuery(currentAddress as string, triggerNFTQuery);

  return <div>{children}</div>;
}
