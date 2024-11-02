'use client';

import {
  useWalletNetWorthQuery,
  useWalletStatsQuery,
} from '@/hooks/api/wallet';
import { formatAddress, formatNumber } from '@/lib/utils';
import { useExplorerStore } from '@/zustand/useExplorerStore';
import { CopyToClipboard } from './copy-to-clipboard';
import QrCodeGenerator from './qr-generator';
import { Typography } from './ui/typography';

export default function WalletStats() {
  const { walletNetWorth, walletStats } = useExplorerStore();

  return (
    <>
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant={'h3'}>Account Stats</Typography>
          </div>
          <div className="">
            <QrCodeGenerator
              nftsOwned={walletStats?.nfts || '---'}
              totalTransactions={walletStats?.transactions.total || '---'}
              netWorth={walletNetWorth?.total_networth_usd as string}
            />
          </div>
        </div>
        <Stats />
      </div>
    </>
  );
}

const Stats = () => {
  const { currentAddress, walletNetWorth, walletStats } = useExplorerStore();
  console.log('walletStats', walletStats);

  const triggerNetWorthQuery = !!currentAddress && !walletNetWorth;
  const triggerStatsQuery = !!currentAddress && !walletStats;

  const { isLoading } = useWalletNetWorthQuery(
    currentAddress as string,
    triggerNetWorthQuery
  );

  const { data: walletStatsData, isLoading: isLoadingWalletStats } =
    useWalletStatsQuery(currentAddress as string, triggerStatsQuery);

  return (
    <div className="grid w-full grid-cols-2 items-stretch gap-0 rounded-2xl shadow-md *:col-span-full md:*:col-span-1">
      <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-t-2xl bg-reown-3 p-4 text-center md:rounded-t-none md:rounded-tl-2xl">
        <Typography variant="small" className="text-gray-700">
          Account:
        </Typography>
        <div className="flex items-center justify-center gap-2">
          <div>
            <Typography
              variant="smallTitle"
              className="hidden font-mono text-black lg:block"
            >
              {currentAddress}
            </Typography>
            <Typography
              variant="smallTitle"
              className="font-mono text-black lg:hidden"
            >
              {formatAddress(currentAddress as string)}
            </Typography>
          </div>
          <CopyToClipboard text={currentAddress as string} />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 bg-reown-1 p-4 text-center md:rounded-tr-2xl">
        <Typography variant="small" className="text-gray-700">
          Net Worth {`(USD)`}:
        </Typography>
        {isLoading ? (
          <Typography variant={'small'} className="block animate-pulse">
            ---
          </Typography>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Typography
              variant="smallTitle"
              className="block font-mono text-black"
            >
              {formatNumber(walletNetWorth?.total_networth_usd as string)}
            </Typography>
            <CopyToClipboard
              text={walletNetWorth?.total_networth_usd as string}
            />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 bg-reown-1 p-4 text-center md:rounded-bl-2xl">
        <Typography variant="small" className="text-gray-700">
          Total Transactions:
        </Typography>

        {isLoadingWalletStats ? (
          <Typography variant={'small'} className="block animate-pulse">
            ---
          </Typography>
        ) : (
          <Typography
            variant="smallTitle"
            className="block font-mono text-black"
          >
            {walletStats?.transactions.total || 0}
          </Typography>
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-b-2xl bg-reown-2 p-4 text-center dark:bg-reown-2 md:rounded-b-none md:rounded-br-2xl">
        <Typography variant="small" className="text-gray-700">
          NFTs Owned:
        </Typography>

        {isLoadingWalletStats ? (
          <Typography variant={'small'} className="block animate-pulse">
            ---
          </Typography>
        ) : (
          <Typography
            variant="smallTitle"
            className="mx-auto block w-fit font-mono text-black"
          >
            {walletStats?.nfts || 0}
          </Typography>
        )}
      </div>
    </div>
  );
};
