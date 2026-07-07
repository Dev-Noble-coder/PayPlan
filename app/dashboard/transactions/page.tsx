'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Download, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const allTransactions = [
  { date: 'Dec 1, 2025', group: 'Rent Collection', payer: 'Alice Johnson', amount: '₦100,000', status: 'Successful', ref: 'txn_1H2kLs...' },
  { date: 'Dec 1, 2025', group: 'Rent Collection', payer: 'Bob Smith', amount: '₦100,000', status: 'Successful', ref: 'txn_1K2mLp...' },
  { date: 'Dec 1, 2025', group: 'Rent Collection', payer: 'Edward Nwosu', amount: '₦100,000', status: 'Successful', ref: 'txn_1N2pMr...' },
  { date: 'Nov 1, 2025', group: 'Rent Collection', payer: 'Diana Prince', amount: '₦100,000', status: 'Failed', ref: 'txn_1H1jKx...' },
  { date: 'Nov 1, 2025', group: 'Rent Collection', payer: 'Charlie Brown', amount: '₦100,000', status: 'Pending', ref: '—' },
  { date: 'Oct 15, 2025', group: 'School Fees', payer: 'John Doe', amount: '₦50,000', status: 'Successful', ref: 'txn_2B3cDe...' },
  { date: 'Oct 15, 2025', group: 'School Fees', payer: 'Jane Smith', amount: '₦50,000', status: 'Successful', ref: 'txn_2B4cDe...' },
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [groupFilter, setGroupFilter] = useState('All Groups');
  
  const [statusOpen, setStatusOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  
  const statusRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) setStatusOpen(false);
      if (groupRef.current && !groupRef.current.contains(event.target as Node)) setGroupOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTransactions = allTransactions.filter(t => {
    const matchesSearch = t.payer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.ref.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || t.status === statusFilter;
    const matchesGroup = groupFilter === 'All Groups' || t.group === groupFilter;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const statuses = ['All Status', 'Successful', 'Pending', 'Failed'];
  const groups = ['All Groups', 'Rent Collection', 'School Fees'];

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border bg-card rounded-full text-sm font-bold hover:bg-secondary transition-colors">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap items-center gap-3">
          {/* Groups Dropdown */}
          <div className="relative" ref={groupRef}>
            <div 
              onClick={() => setGroupOpen(!groupOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-border rounded-full text-sm bg-background cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              {groupFilter} <ChevronDown size={16} className={`text-muted-foreground transition-transform ${groupOpen ? 'rotate-180' : ''}`} />
            </div>
            {groupOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-2 z-10">
                {groups.map(g => (
                  <button 
                    key={g}
                    onClick={() => { setGroupFilter(g); setGroupOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary flex items-center justify-between"
                  >
                    {g}
                    {groupFilter === g && <Check size={14} className="text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="relative" ref={statusRef}>
            <div 
              onClick={() => setStatusOpen(!statusOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-border rounded-full text-sm bg-background cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              {statusFilter} <ChevronDown size={16} className={`text-muted-foreground transition-transform ${statusOpen ? 'rotate-180' : ''}`} />
            </div>
            {statusOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-2 z-10">
                {statuses.map(s => (
                  <button 
                    key={s}
                    onClick={() => { setStatusFilter(s); setStatusOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary flex items-center justify-between"
                  >
                    {s}
                    {statusFilter === s && <Check size={14} className="text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-full text-sm bg-background cursor-pointer hover:bg-secondary/50">
            Last 30 Days <ChevronDown size={16} className="text-muted-foreground" />
          </div>

          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-full text-sm bg-background focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Group</th>
                <th className="px-6 py-4">Payer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((t, i) => (
                  <tr key={i} className="hover:bg-secondary/30 transition-colors group">
                    <td className="px-6 py-4 text-muted-foreground">{t.date}</td>
                    <td className="px-6 py-4 font-medium">{t.group}</td>
                    <td className="px-6 py-4 font-medium">{t.payer}</td>
                    <td className="px-6 py-4 font-bold">{t.amount}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-bold",
                        t.status === 'Successful' ? "text-success bg-success/10" :
                        t.status === 'Failed' ? "text-destructive bg-destructive/10" :
                        "text-amber-600 bg-amber-50"
                      )}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{t.ref}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
