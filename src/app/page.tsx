'use client';

import AddressSearchBar from '@/components/address-search-bar';
import { useState } from 'react';

export default function Home() {
  const [address, setAddress] = useState('');
  // const { data, isFetching } = useWalletTxHistoryQuery(address, !!address);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="flex w-7/12 items-center gap-3">
        <AddressSearchBar />
      </div>
      {/*
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="kushagrasarathe.eth"
        />
        <ButtonIcon icon={SearchIcon} variant={'ghost'} />
       */}
    </div>
  );
}
