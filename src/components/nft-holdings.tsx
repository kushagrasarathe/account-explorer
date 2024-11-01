'use client';
import { cn } from '@/lib/utils';
import { useExplorerStore } from '@/zustand/useExplorerStore';
import { Addreth } from 'addreth';
import { GetWalletNFTsJSONResponse } from 'moralis/common-evm-utils';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Pagination } from './pagination';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Typography } from './ui/typography';

type NFTCardProps = Pick<
  GetWalletNFTsJSONResponse['result'][number],
  keyof GetWalletNFTsJSONResponse['result'][number]
> & {
  token_address?: string;
  contract_type?: string;
  name?: string;
  symbol?: string;
  possible_spam?: boolean;
  verified_collection?: boolean;
  count?: number;
  collection_logo?: string;
  collection_banner_image?: string;
  rarity_label?: string;
};

export default function NFTHoldings() {
  const { nftHoldings } = useExplorerStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const { currentItems, totalPages } = useMemo(() => {
    if (!nftHoldings?.result) {
      return { currentItems: [], totalPages: 0 };
    }

    const totalItems = nftHoldings.result.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = nftHoldings.result.slice(startIndex, endIndex);

    return { currentItems, totalPages };
  }, [nftHoldings?.result, currentPage, pageSize]);

  if (!nftHoldings?.result?.length) {
    return (
      <Typography variant="large" className="text-center">
        No NFTs found
      </Typography>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 items-stretch gap-5 *:col-span-full md:*:col-span-4">
        {currentItems.map((nft) => (
          <NFTCard key={`${nft.token_address}-${nft.token_id}`} {...nft} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

const NFTCard = (nft: NFTCardProps) => {
  return (
    <Card className="group mx-auto w-full max-w-sm transform cursor-pointer space-y-4 overflow-hidden rounded-lg p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex w-full items-center gap-2">
          <img
            src={nft.collection_logo}
            alt="Collection Logo"
            className="h-10 w-10 rounded-full"
          />
          <Typography variant={'large'}>{nft.name}</Typography>
        </div>
        {nft.verified_collection && <Badge className="ml-auto">Verified</Badge>}
      </div>

      <div className="relative">
        <img
          src={nft.collection_logo}
          alt={nft.name}
          className="h-48 w-full rounded-lg border object-cover shadow-inner"
        />
        <Typography
          variant={'large'}
          className={cn(
            'absolute bottom-2 right-2 rounded bg-opacity-60 px-2 py-1 text-xs text-white'
          )}
        >
          {!!nft.rarity_label
            ? `${nft.rarity_label} 💎`
            : `Contract: ${nft.contract_type}`}
        </Typography>
      </div>

      <div className="space-y-2">
        <Typography variant={'small'} className="block">
          Token ID:
        </Typography>
        <Addreth address={nft.token_id as `0x${string}`} actions="copy" />
      </div>

      <div className="space-y-2">
        <Typography variant={'small'} className="block">
          Contract Address:{' '}
        </Typography>
        <Addreth address={nft.token_address as `0x${string}`} actions="copy" />
      </div>
      <div className="space-y-2">
        <Typography variant={'small'} className="block">
          Owner:{' '}
        </Typography>
        <Addreth address={nft.owner_of as `0x${string}`} actions="copy" />
      </div>
      {!!nft.rarity_label && (
        <Typography className="absolute -bottom-20 -right-10 -rotate-45 text-[140px] opacity-50 transition delay-150 group-hover:opacity-70">
          💎
        </Typography>
      )}
      {!!nft.rarity_label && (
        <Image
          src={'/gradient.svg'}
          alt=""
          className="absolute right-0 top-0 rotate-180"
          width={1000}
          height={100}
        />
      )}
    </Card>
  );
};
