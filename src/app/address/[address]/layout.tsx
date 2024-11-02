'use client';

import { useExplorerStore } from '@/zustand/useExplorerStore';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AddressLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const { address } = useParams();
  const { setCurrentAddress } = useExplorerStore();

  useEffect(() => {
    setCurrentAddress(address as string);
  }, [address]);

  return children;
}
