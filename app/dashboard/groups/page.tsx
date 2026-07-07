'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Plus, Users, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock data
const mockGroups = [
  { id: 'rent-collection-jan-2026', name: 'Rent Collection - Jan 2026', totalExpected: 500000, totalCollected: 375000, members: 5, status: 'Active', nextPayment: 'Jan 1, 2026' },
  { id: 'school-fees-term-1', name: 'School Fees - Term 1', totalExpected: 1200000, totalCollected: 1200000, members: 8, status: 'Completed', nextPayment: '—' },
  { id: 'estate-dues-2025', name: 'Estate Dues 2025', totalExpected: 250000, totalCollected: 100000, members: 10, status: 'Active', nextPayment: 'Dec 15, 2025' },
  { id: 'project-contribution', name: 'Project Contribution', totalExpected: 1000000, totalCollected: 450000, members: 4, status: 'Paused', nextPayment: 'Paused' },
];

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [statusOpen, setStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) setStatusOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statuses = ['All Status', 'Active', 'Completed', 'Paused'];

  const filteredGroups = mockGroups.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Payment Groups</h1>
        <Link 
          href="/dashboard/groups/create"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 transition-colors w-max"
        >
          <Plus size={16} />
          Create New Group
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl flex flex-col p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative z-10" ref={statusRef}>
            <div 
              onClick={() => setStatusOpen(!statusOpen)}
              className="flex items-center justify-between min-w-[160px] gap-2 px-4 py-2.5 border border-border rounded-full text-sm bg-background cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              <span className="font-medium text-foreground">{statusFilter}</span> 
              <ChevronDown size={16} className={`text-muted-foreground transition-transform ${statusOpen ? 'rotate-180' : ''}`} />
            </div>
            {statusOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-card border border-border rounded-xl shadow-lg py-2">
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
          
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search groups..." 
              className="w-full pl-11 pr-4 py-2.5 border border-border rounded-full text-sm bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.length === 0 ? (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Search size={24} className="text-muted-foreground/50" />
              </div>
              <p className="font-medium">No groups found matching your criteria.</p>
            </div>
          ) : (
            filteredGroups.map(group => {
              const progress = Math.round((group.totalCollected / group.totalExpected) * 100);
              
              return (
                <Link 
                  href={`/dashboard/groups/${group.id}`} 
                  key={group.id}
                  className="flex flex-col gap-4 p-5 rounded-2xl border border-border bg-background hover:border-primary/50 transition-all hover:shadow-md group/card relative overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-2 relative z-10">
                    <h3 className="font-bold text-foreground line-clamp-1">{group.name}</h3>
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0",
                      group.status === 'Active' ? "bg-success/10 text-success border-success/20" :
                      group.status === 'Completed' ? "bg-blue-50 text-blue-600 border-blue-200" :
                      "bg-amber-50 text-amber-600 border-amber-200"
                    )}>
                      {group.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground relative z-10">
                    <div className="flex items-center gap-1.5">
                      <Users size={16} />
                      <span className="font-medium">{group.members} Payers</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-2 relative z-10">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Collected</span>
                      <span className="font-bold text-foreground">
                        ₦{group.totalCollected.toLocaleString()} <span className="text-muted-foreground font-medium text-xs">/ ₦{group.totalExpected.toLocaleString()}</span>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                      <div className={cn(
                        "h-full rounded-full transition-all duration-500 ease-out",
                        progress === 100 ? "bg-blue-500" : "bg-primary"
                      )} style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-border relative z-10">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground font-medium">Next Payment</span>
                      <span className="text-sm font-bold text-foreground">{group.nextPayment}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors shadow-sm">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
