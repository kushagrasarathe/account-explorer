'use client';
import ExplorerTabs from '@/components/explorer-tabs';
import WalletStats from '@/components/wallet-stats';

export default function AddressPage() {
  return (
    <div className="w-full space-y-8 py-6">
      <div className="flex items-stretch justify-between gap-6">
        <WalletStats />
      </div>
      <ExplorerTabs />
    </div>
  );
}
