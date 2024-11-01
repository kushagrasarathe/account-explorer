import ExplorerTabs from '@/components/explorer-tabs';
import QrCodeGenerator from '@/components/qr-generator';
import WalletStats from '@/components/wallet-stats';

export default function AddressPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-stretch justify-between gap-6">
        <WalletStats />
        <QrCodeGenerator />
      </div>
      <ExplorerTabs />
    </div>
  );
}
