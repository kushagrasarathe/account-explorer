'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useExplorerStore } from '@/store/useExplorerStore';
import { Addreth } from 'addreth';
import { formatUnits } from 'viem';

const columns = ['Txn hash', 'Method', 'Block', 'From/To', 'Value', 'Txn Fee'];

export default function TransactionHistoryTable() {
  const { transactions } = useExplorerStore();

  if (!transactions?.result.length) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableCaption>No transactions found </TableCaption>
      </Table>
    );
  }
  return (
    <Table className="border">
      <TableCaption>A list of all your transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.result.map((txn) => (
          <TableRow>
            <TableCell key={txn.hash}>
              <Addreth address={txn.hash as `0x${string}`} actions="copy" />
            </TableCell>
            <TableCell key={txn.method_label}>{txn.method_label}</TableCell>
            <TableCell key={txn.block_number}>{txn.block_number}</TableCell>
            <TableCell key={txn.from_address}>
              <div className="space-y-1">
                <div>
                  <Addreth
                    address={txn.from_address as `0x${string}`}
                    actions="copy"
                  />
                </div>
                <Addreth
                  address={txn.to_address as `0x${string}`}
                  actions="copy"
                />
              </div>
            </TableCell>
            <TableCell key={txn.value}>
              {formatUnits(BigInt(txn.value), 18)}
            </TableCell>
            <TableCell key={txn.transaction_fee}>
              {txn.transaction_fee}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
