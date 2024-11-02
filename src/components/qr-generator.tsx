import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn, formatAddress } from '@/lib/utils';
import { toPng } from 'html-to-image';
import { Download, Loader2, Share2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { formatEther } from 'viem';
import { useBalance, useEnsName } from 'wagmi';
import { ButtonIcon } from './ui/button-icon';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import DotPattern from './ui/dot-pattern';
import { Typography } from './ui/typography';

interface QrCodeGeneratorProps {
  nftsOwned: string;
  netWorth: string;
  totalTransactions: string;
}

const getCurrentURL = () => {
  if (typeof window !== 'undefined') {
    return window.location.href;
  }
  return '';
};

function QrCodeGenerator({
  nftsOwned,
  netWorth,
  totalTransactions,
}: QrCodeGeneratorProps) {
  const { address } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full space-y-4 md:w-fit">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <ButtonIcon icon={Share2} variant={'ghost'} className="w-full" />
        </DialogTrigger>
        <DialogContent className="z-[10000] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Share Address</DialogTitle>
            <DialogDescription>
              Download a shareable image with address details
            </DialogDescription>
          </DialogHeader>

          <ShareableCard
            address={address as string}
            nftsOwned={nftsOwned}
            netWorth={netWorth}
            totalTransactions={totalTransactions}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ShareableCard({
  address,
  nftsOwned,
  netWorth,
  totalTransactions,
}: QrCodeGeneratorProps & { address: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: ensName } = useEnsName({ address: address as `0x${string}` });
  const { data: balance } = useBalance({ address: address as `0x${string}` });

  const generateImage = async () => {
    if (!cardRef.current) return;

    try {
      setIsGenerating(true);

      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: 'white',
      });

      const link = document.createElement('a');
      link.download = `${ensName || address}-share.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const formattedBalance = balance
    ? Number(formatEther(balance.value)).toFixed(4)
    : '0.0000';

  return (
    <div className="space-y-6">
      <Card
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl dark:bg-white"
      >
        <DotPattern
          className={cn(
            'inset-0 left-3 top-3 h-full w-full bg-opacity-10 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]'
          )}
        />
        <DotPattern
          className={cn(
            'inset-0 h-full w-full bg-opacity-10 [mask-image:linear-gradient(to_top_left,white,transparent,transparent)]'
          )}
        />

        <div className="relative space-y-6">
          <CardHeader className="space-y-2 p-0">
            <Typography
              variant="h3"
              className="text-center font-bold dark:text-black"
            >
              Ethereum Address
            </Typography>
            {ensName && (
              <Typography
                variant="h4"
                className="text-center text-reown-4 dark:text-violet-300"
              >
                {ensName}
              </Typography>
            )}
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center space-y-6 p-0">
            <div className="rounded-xl bg-white p-4 shadow-md">
              <QRCode value={getCurrentURL()} className="size-40" />
            </div>

            <div className="w-full space-y-3 rounded-xl bg-reown-3 p-4">
              <div className="flex justify-between">
                <Typography variant="small" className="text-gray-800">
                  Address
                </Typography>
                <Typography variant="small" className="font-mono text-gray-800">
                  {formatAddress(address)}
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="small" className="text-gray-800">
                  Balance
                </Typography>
                <Typography variant="small" className="font-mono text-gray-800">
                  {formattedBalance} ETH
                </Typography>
              </div>
              {netWorth && (
                <div className="flex justify-between">
                  <Typography variant="small" className="text-gray-800">
                    Net Worth
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-mono text-gray-800"
                  >
                    {netWorth}
                  </Typography>
                </div>
              )}

              {totalTransactions && (
                <div className="flex justify-between">
                  <Typography variant="small" className="text-gray-800">
                    Transactions
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-mono text-gray-800"
                  >
                    {totalTransactions}
                  </Typography>
                </div>
              )}

              {nftsOwned && (
                <div className="flex justify-between">
                  <Typography variant="small" className="text-gray-800">
                    NFTs Owned
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-mono text-gray-800"
                  >
                    {nftsOwned}
                  </Typography>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-center p-0">
            <Typography variant="small" className="text-gray-400">
              Generated by reown.com
            </Typography>
          </CardFooter>
        </div>
      </Card>

      <ButtonIcon
        icon={isGenerating ? Loader2 : Download}
        className="w-full"
        onClick={generateImage}
        disabled={isGenerating}
        variant={'reown-2'}
      >
        {isGenerating ? 'Generating...' : 'Download'}
      </ButtonIcon>
    </div>
  );
}

export default QrCodeGenerator;
