'use client';
import ExplorerTabs from '@/components/explorer-tabs';
import FloatingAddresses from '@/components/ui/floating-addresses';
import WalletStats from '@/components/wallet-stats';

export default function AddressPage() {
  return (
    <div className="relative z-50 flex min-h-[90dvh] items-center justify-center">
      <FloatingAddresses />
      <div className="w-full space-y-8 py-6">
        <div className="flex items-stretch justify-between gap-6">
          <WalletStats />
        </div>
        <ExplorerTabs />
      </div>
    </div>
  );
}
