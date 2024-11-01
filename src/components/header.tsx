import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { ThemeToggle } from './ui/theme-toggle';

export default function Header() {
  return (
    <div className="flex items-center justify-between py-4">
      <Link href={'/'} className={cn(buttonVariants({ variant: 'reown-4' }))}>
        Address Scanner
      </Link>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}
