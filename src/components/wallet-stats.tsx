'use client';

import {
  useWalletNetWorthQuery,
  useWalletStatsQuery,
} from '@/hooks/api/wallet';
import { formatNumber } from '@/lib/utils';
import { useExplorerStore } from '@/zustand/useExplorerStore';
import { CopyToClipboard } from './copy-to-clipboard';
import { Card, CardContent } from './ui/card';
import { Typography } from './ui/typography';

export default function WalletStats() {
  const { currentAddress, walletNetWorth, walletStats } = useExplorerStore();

  const triggerNetWorthQuery = !!currentAddress && !walletNetWorth;
  const triggerStatsQuery = !!currentAddress && !walletStats;

  const { isLoading } = useWalletNetWorthQuery(
    currentAddress as string,
    triggerNetWorthQuery
  );

  const { data: walletStatsData, isLoading: isLoadingWalletStats } =
    useWalletStatsQuery(currentAddress as string, triggerStatsQuery);

  return (
    <Card className="w-full space-y-4 border-0 shadow-none">
      <CardContent className="flex items-stretch justify-between gap-6 p-0">
        <div className="w-2/12">
          <img
            src={`https://effigy.im/a/${currentAddress || 'luc.eth'}.png`}
            className="min-h-40 w-full rounded-2xl shadow-xl"
          />
        </div>
        <div className="grid w-10/12 grid-cols-2 items-stretch gap-0 rounded-2xl shadow-xl md:*:col-span-1">
          <div className="bg-reown-3 w-full rounded-tl-2xl p-4 text-center">
            <Typography variant="small" className="text-gray-700">
              Account:
            </Typography>
            <div className="flex items-center justify-center gap-2">
              <Typography
                variant="smallTitle"
                className="block font-mono text-black"
              >
                {currentAddress}
              </Typography>
              <CopyToClipboard text={currentAddress as string} />
            </div>
          </div>
          <div className="bg-reown-1 flex w-full flex-col items-center justify-center gap-2 rounded-tr-2xl p-4 text-center">
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
          <div className="bg-reown-1 flex w-full flex-col items-center justify-center gap-2 rounded-bl-2xl p-4 text-center">
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
                {walletStatsData?.transactions.total || 0}
              </Typography>
            )}
          </div>
          <div className="bg-reown-3 flex w-full flex-col items-center justify-center gap-2 rounded-br-2xl p-4 text-center">
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
                {walletStatsData?.nfts || 0}
              </Typography>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
