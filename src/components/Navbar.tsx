import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Icons } from '@/components/icons';
import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { ModeToggle } from '@/components/mode-toggle';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NavbarAuth from './NavbarAuth';

interface NavbarProps { }

export const Navbar = ({}: NavbarProps) => {
  return (
    <div className="border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
        </Link>
        <MainNav className="mx-6" />
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <NavbarAuth />
        </div>
      </div>
    </div>
  );
};
