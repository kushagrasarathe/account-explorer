import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Typography } from './ui/typography';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 px-2 py-4">
      <Button
        variant="reown-2"
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        title="First page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="reown-3"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Typography variant={'small'} className="min-w-[100px] text-center">
        Page {currentPage} of {totalPages}
      </Typography>

      <Button
        variant="reown-3"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Button
        variant="reown-2"
        size="sm"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        title="Last page"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
