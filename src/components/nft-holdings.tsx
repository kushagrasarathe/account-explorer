'use client';
import { cn, parseNftMetadata } from '@/lib/utils';
import { useExplorerStore } from '@/store/useExplorerStore';
import { Addreth } from 'addreth';
import { GetWalletNFTsJSONResponse } from 'moralis/common-evm-utils';
import Image from 'next/image';
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
  return (
    <div className="grid grid-cols-12 gap-5 *:col-span-full md:*:col-span-4">
      {nftHoldings?.result.map((nft) => (
        <NFTCard key={nft.token_address} {...nft} />
      ))}
    </div>
  );
}

const NFTCard = (nft: NFTCardProps) => {
  const metadata = parseNftMetadata(nft.metadata as string);
  console.log(metadata?.image_url);

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
