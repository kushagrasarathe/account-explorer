'use client';

import {
  useWalletNetWorthQuery,
  useWalletStatsQuery,
} from '@/hooks/api/wallet';
import { netWorthData, statsData } from '@/lib/mock-data';
import { formatAddress, formatNumber } from '@/lib/utils';
import { useExplorerStore } from '@/zustand/useExplorerStore';
import Avatar from 'boring-avatars';
import { CopyToClipboard } from './copy-to-clipboard';
import QrCodeGenerator from './qr-generator';
import { Typography } from './ui/typography';

export default function WalletStats() {
  return (
    <>
      <div className="w-full space-y-3">
        <Typography variant={'h3'}>Account Stats</Typography>
        <Stats />
      </div>
    </>
  );
}
const AvatarAndQR = () => {
  const { currentAddress, walletNetWorth, walletStats } = useExplorerStore();
  return (
    <div className="cursor-pointer perspective-1000">
      <div className="relative text-black transition-transform duration-700 transform-style-3d hover:rotate-y-180">
        <div className="absolute inset-0 size-full rotate-y-0 backface-hidden">
          <Avatar
            name={currentAddress ?? 'kushagra.eth'}
            variant="beam"
            className="rounded-full shadow-xl"
          />
        </div>
        <div className="absolute inset-0 size-full rotate-y-180 backface-hidden">
          <QrCodeGenerator />
        </div>
      </div>
    </div>
  );
};

const Stats = () => {
  const { currentAddress, walletNetWorth, walletStats } = useExplorerStore();

  const triggerNetWorthQuery = !!currentAddress && !walletNetWorth;
  const triggerStatsQuery = !!currentAddress && !walletStats;

  const { isLoading } = useWalletNetWorthQuery(
    currentAddress as string,
    // triggerNetWorthQuery
    false
  );

  const { data: walletStatsData, isLoading: isLoadingWalletStats } =
    useWalletStatsQuery(
      currentAddress as string,
      // triggerStatsQuery
      false
    );

  return (
    <div className="grid w-full grid-cols-2 items-stretch gap-0 rounded-2xl shadow-md *:col-span-full md:*:col-span-1">
      <div className="h-24 w-full overflow-hidden rounded-t-2xl bg-reown-3 p-4 text-center md:rounded-t-none md:rounded-tl-2xl">
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
      <div className="flex h-24 w-full flex-col items-center justify-center gap-2 bg-reown-1 p-4 text-center md:rounded-tr-2xl">
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
              {formatNumber(netWorthData?.total_networth_usd as string)}
            </Typography>
            <CopyToClipboard
              text={netWorthData?.total_networth_usd as string}
            />
          </div>
        )}
      </div>
      <div className="flex h-24 w-full flex-col items-center justify-center gap-2 bg-reown-1 p-4 text-center md:rounded-bl-2xl">
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
            {statsData?.transactions.total || 0}
          </Typography>
        )}
      </div>
      <div className="flex h-24 w-full flex-col items-center justify-center gap-2 rounded-b-2xl bg-reown-2 p-4 text-center dark:bg-reown-2 md:rounded-b-none md:rounded-br-2xl">
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
            {statsData?.nfts || 0}
          </Typography>
        )}
      </div>
    </div>
  );
};
