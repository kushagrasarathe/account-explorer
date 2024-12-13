import Link from 'next/link';
import { ThemeToggle } from './ui/theme-toggle';

export default function Header() {
  return (
    <div className="z-[1000] flex items-center justify-between pt-6">
      <Link href={'/'} className="flex gap-1">
        <span className={'rounded-full bg-black px-4 py-2 text-white'}>
          gm 🫡
        </span>
      </Link>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}
