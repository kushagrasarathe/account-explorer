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
import { useWalletTxHistoryQuery } from '@/hooks/api/wallet';
import { useExplorerStore } from '@/zustand/useExplorerStore';
import { Addreth } from 'addreth';
import { useState } from 'react';
import { formatEther } from 'viem';
import { Pagination } from './pagination';
import { Badge } from './ui/badge';
import { TableSkeletonLoading } from './ui/table-loading';

const columns = ['Txn hash', 'Method', 'Block', 'From/To', 'Value', 'Txn Fee'];

export default function TransactionHistoryTable() {
  const { transactions, currentAddress } = useExplorerStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const triggerTxsQuery = !!currentAddress && !transactions;

  const { data: walletTxns, isFetching: isFetchingWalletTxns } =
    useWalletTxHistoryQuery(currentAddress as string, triggerTxsQuery);

  if (!!isFetchingWalletTxns) {
    return <TableSkeletonLoading columns={columns} />;
  }

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
      <Table className="bg-white dark:bg-[#222222]">
        <TableHeader>
          <TableRow className="h-16 bg-reown-1 hover:bg-reown-1/80 dark:bg-reown-1/20 dark:hover:bg-reown-1/40">
            {columns.map((column) => (
              <TableHead
                key={column}
                className="min-w-[100px] text-center font-mono dark:text-gray-100"
              >
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((txn) => (
            <TableRow key={txn.hash} className="text-center">
              <TableCell className="">
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
                <div className="mx-auto max-w-[170px] space-y-1 text-start">
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
              <TableCell>{formatEther(BigInt(txn.value))}</TableCell>
              <TableCell>{Number(txn.transaction_fee).toFixed(4)}</TableCell>
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
