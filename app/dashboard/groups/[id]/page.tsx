'use client';

import { useState, useRef, useEffect, use } from 'react';
import { 
  FileText, 
  Users, 
  ArrowRightLeft, 
  Settings, 
  MoreVertical, 
  Pause, 
  Play, 
  RotateCcw, 
  UserPlus,
  Search,
  ChevronDown,
  Check,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const mockGroups = [
  { id: 'rent-collection-jan-2026', name: 'Rent Collection - Jan 2026', totalExpected: 500000, totalCollected: 375000, status: 'Active', nextPayment: 'Jan 1, 2026', collectionRate: 75 },
  { id: 'school-fees-term-1', name: 'School Fees - Term 1', totalExpected: 1200000, totalCollected: 1200000, status: 'Completed', nextPayment: '—', collectionRate: 100 },
  { id: 'estate-dues-2025', name: 'Estate Dues 2025', totalExpected: 250000, totalCollected: 100000, status: 'Active', nextPayment: 'Dec 15, 2025', collectionRate: 40 },
  { id: 'project-contribution', name: 'Project Contribution', totalExpected: 1000000, totalCollected: 450000, status: 'Paused', nextPayment: 'Paused', collectionRate: 45 },
];

export default function GroupViewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const group = mockGroups.find(g => g.id === resolvedParams.id) || mockGroups[0];
  
  const [activeTab, setActiveTab] = useState('overview');

  // Payers state
  const [payersSearch, setPayersSearch] = useState('');
  const [payersStatus, setPayersStatus] = useState('All Status');
  const [payersStatusOpen, setPayersStatusOpen] = useState(false);
  const payersStatusRef = useRef<HTMLDivElement>(null);

  // Tx state
  const [txSearch, setTxSearch] = useState('');
  const [txStatus, setTxStatus] = useState('All Status');
  const [txStatusOpen, setTxStatusOpen] = useState(false);
  const [txPayer, setTxPayer] = useState('All Payers');
  const [txPayerOpen, setTxPayerOpen] = useState(false);
  const txStatusRef = useRef<HTMLDivElement>(null);
  const txPayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (payersStatusRef.current && !payersStatusRef.current.contains(event.target as Node)) setPayersStatusOpen(false);
      if (txStatusRef.current && !txStatusRef.current.contains(event.target as Node)) setTxStatusOpen(false);
      if (txPayerRef.current && !txPayerRef.current.contains(event.target as Node)) setTxPayerOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'payers', label: 'Payers', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const allPayers = [
    { name: 'Alice Johnson', email: 'alice@gmail.com', amount: '₦100,000', status: 'Active', joined: 'Nov 20, 2025', lastPaid: 'Dec 1, 2025' },
    { name: 'Bob Smith', email: 'bob@gmail.com', amount: '₦100,000', status: 'Active', joined: 'Nov 20, 2025', lastPaid: 'Dec 1, 2025' },
    { name: 'Charlie Brown', email: 'charlie@gmail.com', amount: '₦100,000', status: 'Invited', joined: 'Nov 23, 2025', lastPaid: '—' },
    { name: 'Diana Prince', email: 'diana@gmail.com', amount: '₦100,000', status: 'Failed', joined: 'Nov 20, 2025', lastPaid: 'Nov 1, 2025' },
    { name: 'Edward Nwosu', email: 'edward@gmail.com', amount: '₦100,000', status: 'Active', joined: 'Nov 20, 2025', lastPaid: 'Dec 1, 2025' },
  ];

  const filteredPayers = allPayers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(payersSearch.toLowerCase()) || p.email.toLowerCase().includes(payersSearch.toLowerCase());
    const matchesStatus = payersStatus === 'All Status' || p.status === payersStatus;
    return matchesSearch && matchesStatus;
  });

  const allTx = [
    { date: 'Dec 1, 2025', payer: 'Alice Johnson', amount: '₦100,000', status: 'Successful', ref: 'txn_1H2kLs...' },
    { date: 'Dec 1, 2025', payer: 'Bob Smith', amount: '₦100,000', status: 'Successful', ref: 'txn_1K2mLp...' },
    { date: 'Dec 1, 2025', payer: 'Edward Nwosu', amount: '₦100,000', status: 'Successful', ref: 'txn_1N2pMr...' },
    { date: 'Nov 1, 2025', payer: 'Diana Prince', amount: '₦100,000', status: 'Failed', ref: 'txn_1H1jKx...' },
    { date: 'Nov 1, 2025', payer: 'Charlie Brown', amount: '₦100,000', status: 'Pending', ref: '—' },
  ];

  const filteredTx = allTx.filter(t => {
    const matchesSearch = t.payer.toLowerCase().includes(txSearch.toLowerCase()) || t.ref.toLowerCase().includes(txSearch.toLowerCase());
    const matchesStatus = txStatus === 'All Status' || t.status === txStatus;
    const matchesPayer = txPayer === 'All Payers' || t.payer === txPayer;
    return matchesSearch && matchesStatus && matchesPayer;
  });

  const payerStatuses = ['All Status', 'Active', 'Invited', 'Failed'];
  const txStatuses = ['All Status', 'Successful', 'Pending', 'Failed'];
  const txPayersList = ['All Payers', ...Array.from(new Set(allTx.map(t => t.payer)))];

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link href="/dashboard/groups" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-max font-medium text-sm">
          <ArrowLeft size={16} /> Back to Groups
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 -ml-2 text-muted-foreground bg-secondary/50 rounded-full">
              <FileText size={24} />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{group.name}</h1>
            <span className={cn(
              "px-2.5 py-1 rounded-full text-xs font-bold border",
              group.status === 'Active' ? "bg-success/10 text-success border-success/20" :
              group.status === 'Completed' ? "bg-blue-50 text-blue-600 border-blue-200" :
              "bg-amber-50 text-amber-600 border-amber-200"
            )}>
              {group.status}
            </span>
          </div>
          <button className="p-2 text-muted-foreground hover:bg-secondary rounded-full self-start sm:self-auto">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-4 text-sm font-bold whitespace-nowrap flex items-center gap-2 border-b-2 transition-colors",
              activeTab === tab.id 
                ? "border-primary text-foreground" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-muted-foreground">Total Expected</p>
              <h2 className="text-3xl font-bold text-foreground">₦{group.totalExpected.toLocaleString()}</h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-muted-foreground">Total Collected</p>
              <h2 className="text-3xl font-bold text-foreground">₦{group.totalCollected.toLocaleString()}</h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-foreground">{group.collectionRate}%</h2>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={cn(
                    "h-full rounded-full",
                    group.collectionRate === 100 ? "bg-blue-500" : "bg-primary"
                  )} style={{ width: `${group.collectionRate}%` }}></div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-muted-foreground">Next Payment</p>
              <div>
                <h2 className="text-xl font-bold text-foreground">{group.nextPayment}</h2>
                {group.status === 'Active' && <p className="text-sm text-muted-foreground mt-1">in 15 days</p>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Payers Summary */}
            <div className="bg-card border border-border rounded-2xl p-6 lg:col-span-1 flex flex-col">
              <h3 className="font-bold text-foreground mb-6">Payers Summary</h3>
              <div className="flex items-center justify-between mt-auto mb-auto">
                {/* Mocked Donut Chart */}
                <div className="relative w-32 h-32 rounded-full border-[16px] border-primary flex items-center justify-center mx-auto">
                  <div className="absolute inset-[-16px] rounded-full border-[16px] border-amber-400 border-t-transparent border-l-transparent border-b-transparent transform rotate-45"></div>
                  <div className="absolute inset-[-16px] rounded-full border-[16px] border-red-500 border-r-transparent border-l-transparent border-b-transparent transform -rotate-[70deg]"></div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-foreground">5</span>
                    <span className="text-xs text-muted-foreground font-medium">Total</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    <span className="text-sm text-muted-foreground"><span className="font-bold text-foreground">3</span> Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <span className="text-sm text-muted-foreground"><span className="font-bold text-foreground">1</span> Invited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <span className="text-sm text-muted-foreground"><span className="font-bold text-foreground">1</span> Failed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary border border-border"></div>
                    <span className="text-sm text-muted-foreground"><span className="font-bold text-foreground">0</span> Paused</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-6 lg:col-span-1 flex flex-col gap-4">
              <h3 className="font-bold text-foreground">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-sm font-bold hover:bg-amber-100 transition-colors">
                  <Pause size={16} /> Pause All Payments
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-success/20 bg-success/10 text-success text-sm font-bold hover:bg-success/20 transition-colors">
                  <Play size={16} /> Resume All Payments
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-border bg-card text-foreground text-sm font-bold hover:bg-secondary transition-colors">
                  <RotateCcw size={16} className="text-pink-600" /> Retry Failed Payments
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors mt-auto">
                  <UserPlus size={16} /> Add Payer
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-2xl p-6 lg:col-span-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-foreground">Recent Activity</h3>
                <span className="text-sm font-bold text-primary hover:underline cursor-pointer">View all</span>
              </div>
              <div className="flex flex-col gap-5 overflow-y-auto max-h-[250px] pr-2">
                {[
                  { name: 'Alice Johnson', action: 'Payment successful', amount: '₦100,000', date: 'Dec 1, 2025', status: 'success' },
                  { name: 'Bob Smith', action: 'Payment successful', amount: '₦100,000', date: 'Dec 1, 2025', status: 'success' },
                  { name: 'Diana Prince', action: 'Payment failed', amount: '₦100,000', date: 'Dec 1, 2025', status: 'failed' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0">
                        {item.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground">{item.name}</span>
                        <span className={cn("text-xs", item.status === 'success' ? "text-success" : "text-destructive")}>{item.action}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                      <span className="text-sm font-bold text-foreground">{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payers Tab Content */}
      {activeTab === 'payers' && (
        <div className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
          {/* Controls */}
          <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative" ref={payersStatusRef}>
                <div 
                  onClick={() => setPayersStatusOpen(!payersStatusOpen)}
                  className="flex items-center gap-2 px-3 py-2 border border-border rounded-full text-sm bg-background cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  {payersStatus} <ChevronDown size={16} className={`text-muted-foreground transition-transform ${payersStatusOpen ? 'rotate-180' : ''}`} />
                </div>
                {payersStatusOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-2 z-10">
                    {payerStatuses.map(s => (
                      <button 
                        key={s}
                        onClick={() => { setPayersStatus(s); setPayersStatusOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary flex items-center justify-between"
                      >
                        {s}
                        {payersStatus === s && <Check size={14} className="text-primary" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative flex-1 sm:min-w-[250px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  value={payersSearch}
                  onChange={(e) => setPayersSearch(e.target.value)}
                  placeholder="Search payers..." 
                  className="w-full pl-9 pr-4 py-2 border border-border rounded-full text-sm bg-background focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:bg-primary/90 transition-colors">
              <UserPlus size={16} /> Add Payer
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Payer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined On</th>
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
                      <td className="px-6 py-4 text-muted-foreground">{p.joined}</td>
                      <td className="px-6 py-4 text-muted-foreground">{p.lastPaid}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border text-xs text-muted-foreground font-medium">
            Showing 1 to {filteredPayers.length} of {allPayers.length} payers
          </div>
        </div>
      )}

      {/* Transactions Tab Content */}
      {activeTab === 'transactions' && (
        <div className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border flex flex-wrap items-center gap-3">
            <div className="relative" ref={txPayerRef}>
              <div 
                onClick={() => setTxPayerOpen(!txPayerOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-border rounded-full text-sm bg-background cursor-pointer hover:bg-secondary/50 transition-colors"
              >
                {txPayer} <ChevronDown size={16} className={`text-muted-foreground transition-transform ${txPayerOpen ? 'rotate-180' : ''}`} />
              </div>
              {txPayerOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-2 z-10 max-h-[300px] overflow-y-auto">
                  {txPayersList.map(s => (
                    <button 
                      key={s}
                      onClick={() => { setTxPayer(s); setTxPayerOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary flex items-center justify-between"
                    >
                      {s}
                      {txPayer === s && <Check size={14} className="text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={txStatusRef}>
              <div 
                onClick={() => setTxStatusOpen(!txStatusOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-border rounded-full text-sm bg-background cursor-pointer hover:bg-secondary/50 transition-colors"
              >
                {txStatus} <ChevronDown size={16} className={`text-muted-foreground transition-transform ${txStatusOpen ? 'rotate-180' : ''}`} />
              </div>
              {txStatusOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-2 z-10">
                  {txStatuses.map(s => (
                    <button 
                      key={s}
                      onClick={() => { setTxStatus(s); setTxStatusOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary flex items-center justify-between"
                    >
                      {s}
                      {txStatus === s && <Check size={14} className="text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-full text-sm bg-background cursor-pointer hover:bg-secondary/50">
              Dec 1 - Dec 31, 2025 <ChevronDown size={16} className="text-muted-foreground" />
            </div>
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                value={txSearch}
                onChange={(e) => setTxSearch(e.target.value)}
                placeholder="Search transactions..." 
                className="w-full pl-9 pr-4 py-2 border border-border rounded-full text-sm bg-background focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Payer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {filteredTx.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      No transactions found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTx.map((t, i) => (
                    <tr key={i} className="hover:bg-secondary/30 transition-colors group">
                      <td className="px-6 py-4 text-muted-foreground">{t.date}</td>
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
      )}
    </div>
  );
}
