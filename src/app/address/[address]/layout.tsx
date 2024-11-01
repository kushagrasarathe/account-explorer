'use client';

import { useExplorerStore } from '@/store/useExplorerStore';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import AddressWrapper from './address-wrapper';

export default function AddressLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const { address } = useParams();
  const { setCurrentAddress } = useExplorerStore();

  useEffect(() => {
    setCurrentAddress(address as string);
  }, [address, setCurrentAddress]);

  return <AddressWrapper>{children}</AddressWrapper>;
}
