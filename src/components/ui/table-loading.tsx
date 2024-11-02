import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from './skeleton';

export function TableSkeletonLoading({
  columns,
  hideColName = false,
}: {
  columns: string[];
  hideColName?: boolean;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="h-16 bg-reown-1 hover:bg-reown-1/80 dark:bg-reown-1/20 dark:hover:bg-reown-1/40">
          {columns.map((col, idx) => (
            <TableHead
              key={idx}
              className="min-w-[100px] text-center font-mono dark:text-gray-100"
            >
              {hideColName ? <Skeleton className="h-4 w-24" /> : col}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {columns.slice(0, 3).map((col, idx) => (
          <TableRow key={idx}>
            <TableCell colSpan={columns.length}>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
