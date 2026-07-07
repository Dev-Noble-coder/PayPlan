'use client';

import { Landmark, MoreVertical, Plus } from 'lucide-react';

export default function BankAccountsPage() {
  return (
    <div className="flex flex-col gap-6 pb-10 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Saved Bank Accounts</h1>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 transition-colors">
          <Plus size={16} />
          Add Bank Account
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {[
          { name: 'Landlord Chidi - Access Bank', bank: 'Access Bank', account: '••••1234', isDefault: true },
          { name: 'Estate Manager - GTBank', bank: 'GTBank', account: '••••5678', isDefault: false },
          { name: 'School Main Account - Zenith Bank', bank: 'Zenith Bank', account: '••••9012', isDefault: false },
          { name: 'Business Account - First Bank', bank: 'First Bank', account: '••••3456', isDefault: false },
        ].map((acc, idx) => (
          <div key={idx} className="bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                <Landmark size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground">{acc.name}</span>
                <span className="text-sm text-muted-foreground">{acc.bank} • {acc.account}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {acc.isDefault && (
                <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold hidden sm:block">Default</span>
              )}
              <button className="p-2 text-muted-foreground hover:bg-secondary rounded-lg">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
