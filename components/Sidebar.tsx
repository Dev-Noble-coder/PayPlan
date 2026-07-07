'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  UserSquare, 
  ArrowRightLeft, 
  Landmark, 
  Settings, 
  HelpCircle,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Groups', href: '/dashboard/groups', icon: Users },
  { name: 'Payers', href: '/dashboard/payers', icon: UserSquare },
  { name: 'Transactions', href: '/dashboard/transactions', icon: ArrowRightLeft },
  { name: 'Bank Accounts', href: '/dashboard/bank-accounts', icon: Landmark },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ onClose }: { onClose?: () => void } = {}) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-card flex flex-col h-full hidden md:flex">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-border/50 shrink-0">
        <div className="flex items-center gap-2 text-foreground">
          {/* Logo shape using primary brand color */}
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-black font-extrabold text-lg leading-none">P</span>
          </div>
          <span className="font-bold text-xl tracking-tight">PayPlan</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/dashboard');
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-full text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-foreground font-bold" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon size={20} className={cn(isActive ? "text-primary" : "")} />
              {item.name}
            </Link>
          );
        })}

        <div className="mt-8 mb-2 px-3">
          <div className="h-px w-full bg-border" />
        </div>

        <Link
          href="/help"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-full text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <HelpCircle size={20} />
          Help & Support
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 mt-auto border-t border-border/50 shrink-0">
        <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-full text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
