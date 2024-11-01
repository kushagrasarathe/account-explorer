import ExplorerTabs from '@/components/explorer-tabs';
import WalletStats from '@/components/wallet-stats';

export default function AddressPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-stretch justify-between gap-6">
        <WalletStats />
        {/* <QrCodeGenerator /> */}
      </div>
      <ExplorerTabs />
    </div>
  );
}
