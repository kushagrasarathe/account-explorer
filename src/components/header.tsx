import { ThemeToggle } from './ui/theme-toggle';

export default function Header() {
  return (
    <div className="flex items-center justify-between py-4">
      <div>ETH Explorer</div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}
