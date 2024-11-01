'use client';

import { useWalletTxHistoryQuery } from '@/hooks/api/transactions';
import { useExplorerStore } from '@/store/useExplorerStore';
import React from 'react';

export default function AddressWrapper({
  children,
}: React.PropsWithChildren<{}>) {
  const { currentAddress, transactions } = useExplorerStore();

  const triggerTxsQuery = !!currentAddress && !transactions;

  const { data, isFetching } = useWalletTxHistoryQuery(
    currentAddress as string,
    triggerTxsQuery
  );

  return <div>{children}</div>;
}
