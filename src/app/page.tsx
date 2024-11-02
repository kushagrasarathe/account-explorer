'use client';

import AddressSearchBar from '@/components/address-search-bar';
import FloatingAddresses from '@/components/ui/floating-addresses';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="relative z-50 flex min-h-[90dvh] items-center justify-center">
        <FloatingAddresses />
        <div className="relative flex w-full items-center justify-center md:w-9/12">
          <Image
            src={'/overlay.png'}
            alt=""
            width={1000}
            height={1000}
            className="absolute -z-10 h-[280px] w-full rounded-3xl shadow-2xl"
          />
          <div className="mx-auto h-full w-10/12 text-black md:w-8/12">
            <AddressSearchBar />
          </div>
        </div>
      </div>
    </>
  );
}
