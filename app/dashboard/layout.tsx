'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="absolute inset-y-0 left-0 w-64 bg-card shadow-2xl flex flex-col animate-in slide-in-from-left">
            <div className="absolute top-4 right-4 z-50">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-secondary rounded-full text-foreground"
              >
                <X size={20} />
              </button>
            </div>
            {/* The Sidebar component might render duplicated IDs if we're not careful, but it's safe here */}
            <div className="flex-1 overflow-y-auto [&>aside]:w-full [&>aside]:border-none [&>aside]:flex">
              <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
