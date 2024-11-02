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
import { useWalletTokenHoldingsQuery } from '@/hooks/api/wallet';
import { useExplorerStore } from '@/zustand/useExplorerStore';
import { useState } from 'react';
import { Pagination } from './pagination';
import { Badge } from './ui/badge';
import { TableSkeletonLoading } from './ui/table-loading';
import { Typography } from './ui/typography';

const columns = [
  'Asset',
  'Symbol',
  'Quantity',
  'Price',
  'Value',
  'Portfolio Percentage',
];

export default function TokenHoldingsTable() {
  const { tokenHoldings, currentAddress } = useExplorerStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const triggerTokenHoldingsQuery = !!currentAddress && !tokenHoldings;
  const { data: tokenHoldingsData, isFetching: isFetchingTokenHHoldings } =
    useWalletTokenHoldingsQuery(
      currentAddress as string,
      triggerTokenHoldingsQuery
    );

  if (!!isFetchingTokenHHoldings) {
    return <TableSkeletonLoading columns={columns} />;
  }

  if (!tokenHoldings?.result.length) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableCaption className="pb-4">No tokens found</TableCaption>
      </Table>
    );
  }

  const totalItems = tokenHoldings.result.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = tokenHoldings.result.slice(startIndex, endIndex);

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
          {currentItems.map((asset) => {
            // if (asset.possible_spam) return;
            return (
              <TableRow key={asset.token_address} className="text-center">
                <TableCell className="">
                  <div className="flex w-fit items-center justify-start gap-2">
                    {!!asset.logo ? (
                      <img
                        src={asset.logo}
                        className="size-6 rounded-full shadow-md"
                      />
                    ) : (
                      <div className="size-6 rounded-full bg-gradient-to-tr from-reown-2 to-reown-3 shadow-md" />
                    )}
                    <Typography variant={'small'} className="truncate">
                      {asset.name}
                    </Typography>
                    {asset.possible_spam && (
                      <Badge
                        variant={'outline'}
                        className="border-reown-2 text-xs text-reown-2"
                      >
                        Spam
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{asset.symbol}</TableCell>
                <TableCell>
                  {Number(asset.balance_formatted).toFixed(3)}
                </TableCell>
                <TableCell>
                  {Number(asset.usd_price)?.toFixed(2) || '-'}
                </TableCell>
                <TableCell>{asset.usd_value?.toFixed(2) || '-'}</TableCell>
                <TableCell>{asset.portfolio_percentage?.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
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
