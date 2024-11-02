import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './ui/theme-toggle';

export default function Header() {
  return (
    <div className="z-[1000] flex items-center justify-between pt-6">
      <Link href={'/'} className={''}>
        <Image
          src={'reown.svg'}
          alt=""
          width={140}
          height={100}
          className="dark:invert"
        />
      </Link>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}
