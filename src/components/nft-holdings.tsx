'use client';
import { useNFTHoldingsQuery } from '@/hooks/api/nfts';
import { constNFTHoldingsData } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useExplorerStore } from '@/zustand/useExplorerStore';
import { Addreth } from 'addreth';
import { GetWalletNFTsJSONResponse } from 'moralis/common-evm-utils';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Pagination } from './pagination';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';
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
  const { nftHoldings, currentAddress } = useExplorerStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const triggerNFTQuery = !!currentAddress && !nftHoldings;

  const { data: nftHoldingsData, isFetching: isFetchingWalletNFTs } =
    useNFTHoldingsQuery(
      currentAddress as string,
      // triggerNFTQuery,
      false
    );

  if (!constNFTHoldingsData?.result?.length) {
    return (
      <Typography variant="large" className="text-center">
        No NFTs found
      </Typography>
    );
  }

  const { currentItems, totalPages } = useMemo(() => {
    if (!constNFTHoldingsData?.result) {
      return { currentItems: [], totalPages: 0 };
    }

    const totalItems = constNFTHoldingsData.result.length || 0;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = constNFTHoldingsData.result.slice(
      startIndex,
      endIndex
    );

    return { currentItems, totalPages };
  }, [nftHoldings?.result, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!!isFetchingWalletNFTs) {
    return (
      <div className="grid grid-cols-12 items-stretch gap-5 *:col-span-full md:*:col-span-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="min-h-96 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 items-stretch gap-5 *:col-span-full md:*:col-span-4">
        {currentItems.map((nft) => (
          <NFTCard
            key={`${nft.token_address}-${nft.token_id}`}
            {...nft}
            rarity_label={nft.rarity_label || undefined}
          />
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
    <Card className="group mx-auto w-full max-w-sm cursor-pointer space-y-4 overflow-hidden rounded-lg p-4 shadow-lg transition-all duration-300 transform hover:shadow-xl dark:border-white/20 dark:bg-[#222222]">
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
          className="h-48 w-full rounded-lg border object-cover shadow-inner dark:border-white/20"
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
        <Typography className="absolute -bottom-20 -right-10 text-[140px] opacity-50 transition delay-150 -rotate-45 group-hover:opacity-70">
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
