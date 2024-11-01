import ExplorerTabs from '@/components/explorer-tabs';
import QrCodeGenerator from '@/components/qr-generator';
import { Card } from '@/components/ui/card';

export default function AddressPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-stretch justify-between gap-6">
        <Card className="w-full"></Card>
        <QrCodeGenerator />
      </div>
      <ExplorerTabs />
    </div>
  );
}
