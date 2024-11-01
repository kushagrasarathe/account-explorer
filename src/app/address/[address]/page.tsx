import NFTHoldings from '@/components/nft-holdings';
import TransactionHistoryTable from '@/components/transaction-history';

export default function AddressPage() {
  return (
    <div>
      <NFTHoldings />
      <TransactionHistoryTable />
    </div>
  );
}
