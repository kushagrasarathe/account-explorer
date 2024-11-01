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
import { useExplorerStore } from '@/zustand/useExplorerStore';
import { Addreth } from 'addreth';
import { useState } from 'react';
import { formatUnits } from 'viem';
import { Pagination } from './pagination';
import { Badge } from './ui/badge';

const columns = ['Txn hash', 'Method', 'Block', 'From/To', 'Value', 'Txn Fee'];

export default function TransactionHistoryTable() {
  const { transactions } = useExplorerStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

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
        <TableCaption className="pb-4">No transactions found</TableCaption>
      </Table>
    );
  }

  const totalItems = transactions.result.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = transactions.result.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      <Table className="">
        <TableHeader>
          <TableRow className="bg-reown-1 hover:bg-reown-1/80 h-16">
            {columns.map((column) => (
              <TableHead key={column} className="text-center font-mono">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((txn) => (
            <TableRow key={txn.hash} className="text-center">
              <TableCell>
                <Addreth address={txn.hash as `0x${string}`} actions="copy" />
              </TableCell>
              <TableCell>
                {txn.method_label ? (
                  <Badge
                    variant={'outline'}
                    className="font-mono font-normal capitalize"
                  >
                    {txn.method_label}
                  </Badge>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>{txn.block_number}</TableCell>
              <TableCell>
                <div className="space-y-1 text-end">
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
              <TableCell>{formatUnits(BigInt(txn.value), 18)}</TableCell>
              <TableCell>{txn.transaction_fee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
