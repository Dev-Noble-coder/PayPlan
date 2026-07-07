'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, UserPlus, Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const allPayers = [
  { name: 'Alice Johnson', email: 'alice@gmail.com', amount: '₦100,000', group: 'Rent Collection - Jan 2026', status: 'Active', joined: 'Nov 20, 2025', lastPaid: 'Dec 1, 2025' },
  { name: 'Bob Smith', email: 'bob@gmail.com', amount: '₦100,000', group: 'Rent Collection - Jan 2026', status: 'Active', joined: 'Nov 20, 2025', lastPaid: 'Dec 1, 2025' },
  { name: 'Charlie Brown', email: 'charlie@gmail.com', amount: '₦100,000', group: 'Rent Collection - Jan 2026', status: 'Invited', joined: 'Nov 23, 2025', lastPaid: '—' },
  { name: 'Diana Prince', email: 'diana@gmail.com', amount: '₦100,000', group: 'Rent Collection - Jan 2026', status: 'Failed', joined: 'Nov 20, 2025', lastPaid: 'Nov 1, 2025' },
  { name: 'John Doe', email: 'john@gmail.com', amount: '₦50,000', group: 'School Fees - Term 1', status: 'Active', joined: 'Oct 15, 2025', lastPaid: 'Oct 15, 2025' },
  { name: 'Jane Smith', email: 'jane@gmail.com', amount: '₦50,000', group: 'School Fees - Term 1', status: 'Active', joined: 'Oct 15, 2025', lastPaid: 'Oct 15, 2025' },
];

export default function PayersPage() {
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

  const statuses = ['All Status', 'Active', 'Invited', 'Failed'];
  const groups = ['All Groups', ...Array.from(new Set(allPayers.map(p => p.group)))];

  const filteredPayers = allPayers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || p.status === statusFilter;
    const matchesGroup = groupFilter === 'All Groups' || p.group === groupFilter;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Payers Directory</h1>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 transition-colors w-max">
          <UserPlus size={16} />
          Add Payer
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap items-center gap-3">
          
          <div className="relative" ref={groupRef}>
            <div 
              onClick={() => setGroupOpen(!groupOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-full text-sm bg-background cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              {groupFilter} <ChevronDown size={16} className={`text-muted-foreground transition-transform ${groupOpen ? 'rotate-180' : ''}`} />
            </div>
            {groupOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-2 z-10 max-h-[300px] overflow-y-auto">
                {groups.map(g => (
                  <button 
                    key={g}
                    onClick={() => { setGroupFilter(g); setGroupOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary flex items-center justify-between"
                  >
                    <span className="truncate">{g}</span>
                    {groupFilter === g && <Check size={14} className="text-primary shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={statusRef}>
            <div 
              onClick={() => setStatusOpen(!statusOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-full text-sm bg-background cursor-pointer hover:bg-secondary/50 transition-colors"
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

          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search payers..." 
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-full text-sm bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Payer</th>
                <th className="px-6 py-4">Group</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {filteredPayers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No payers found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredPayers.map((p, i) => (
                  <tr key={i} className="hover:bg-secondary/30 transition-colors group">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/payers/${p.name.toLowerCase().replace(' ', '-')}`} className="flex flex-col hover:text-primary transition-colors">
                        <span className="font-bold">{p.name}</span>
                        <span className="text-xs text-muted-foreground">{p.email}</span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium">{p.group}</td>
                    <td className="px-6 py-4 font-bold">{p.amount}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-bold border",
                        p.status === 'Active' ? "bg-success/10 text-success border-success/20" :
                        p.status === 'Invited' ? "bg-blue-50 text-blue-600 border-blue-200" :
                        "bg-destructive/10 text-destructive border-destructive/20"
                      )}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{p.lastPaid}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border text-xs text-muted-foreground font-medium bg-background/50">
          Showing 1 to {filteredPayers.length} of {allPayers.length} payers
        </div>
      </div>
    </div>
  );
}
