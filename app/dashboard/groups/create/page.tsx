'use client';

import { useState } from 'react';
import { ArrowLeft, Check, Upload, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function CreateGroupPage() {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, name: 'Group Details' },
    { id: 2, name: 'Add Payers' },
    { id: 3, name: 'Review & Create' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-10 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Create New Group</h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between relative max-w-2xl mx-auto w-full mb-8">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-border -z-10 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 h-[2px] bg-primary -z-10 -translate-y-1/2 transition-all duration-300" 
             style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}></div>
        
        {steps.map((s) => (
          <div key={s.id} className="flex items-center gap-3 bg-background px-4">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
              step > s.id ? "bg-primary text-primary-foreground" : 
              step === s.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground border border-border"
            )}>
              {step > s.id ? <Check size={16} /> : s.id}
            </div>
            <span className={cn(
              "text-sm font-bold hidden sm:block",
              step >= s.id ? "text-foreground" : "text-muted-foreground"
            )}>{s.name}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Group Details */}
      {step === 1 && (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Group Details</h2>
            <p className="text-sm text-muted-foreground">Tell us about your group.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-foreground">Group Name</label>
              <input type="text" defaultValue="Rent Collection - January 2026" className="px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-foreground">Frequency</label>
              <select className="px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-foreground">Start Date</label>
              <input type="date" defaultValue="2026-01-01" className="px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-foreground">End Date (Optional)</label>
              <input type="date" defaultValue="2026-12-01" className="px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-foreground">Payment Destination</label>
            <p className="text-xs text-muted-foreground mb-1">Where all payments will be sent.</p>
            <div className="flex flex-col gap-2">
              <select className="px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none">
                <option>Saved Bank Accounts</option>
                <option>Landlord Chidi - Access Bank ••••1234</option>
              </select>
              <button className="text-primary text-sm font-bold w-max hover:underline">+ Add new bank account</button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-sm font-bold text-foreground">Visibility Setting</label>
              <p className="text-xs text-muted-foreground">What payers can see.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-primary bg-primary/5 rounded-xl p-4 cursor-pointer relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full border-4 border-primary bg-white"></div>
                  <span className="font-bold text-foreground text-sm">Closed Group</span>
                </div>
                <p className="text-xs text-muted-foreground ml-6">Payers see only their own plan and status.</p>
              </div>
              <div className="border border-border bg-card rounded-xl p-4 cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full border border-border"></div>
                  <span className="font-bold text-foreground text-sm">Open Group</span>
                </div>
                <p className="text-xs text-muted-foreground ml-6">Payers see overall progress (e.g., 3 of 5 paid).</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button 
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors"
            >
              Continue to Add Payers
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Add Payers */}
      {step === 2 && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Add Payers</h2>
              <p className="text-sm text-muted-foreground">Add everyone who needs to pay.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-border bg-card rounded-full text-sm font-bold hover:bg-secondary transition-colors">
              <Upload size={16} />
              Import from CSV
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-12 gap-4 px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden md:grid">
              <div className="col-span-4">Name</div>
              <div className="col-span-4">Email Address</div>
              <div className="col-span-3">Amount (₦)</div>
              <div className="col-span-1"></div>
            </div>

            {[
              { name: 'Alice Johnson', email: 'alice@gmail.com', amount: '100,000' },
              { name: 'Bob Smith', email: 'bob@gmail.com', amount: '100,000' },
              { name: 'Charlie Brown', email: 'charlie@gmail.com', amount: '100,000' },
              { name: 'Diana Prince', email: 'diana@gmail.com', amount: '100,000' },
              { name: 'Edward Nwosu', email: 'edward@gmail.com', amount: '100,000' },
            ].map((payer, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="col-span-1 md:col-span-4">
                  <input type="text" defaultValue={payer.name} placeholder="Name" className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                </div>
                <div className="col-span-1 md:col-span-4">
                  <input type="email" defaultValue={payer.email} placeholder="Email" className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                </div>
                <div className="col-span-1 md:col-span-3">
                  <input type="text" defaultValue={payer.amount} placeholder="Amount" className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                </div>
                <div className="col-span-1 flex justify-end md:justify-center">
                  <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <button className="flex items-center gap-2 text-primary font-bold text-sm w-max mt-2 hover:underline">
              <Plus size={16} /> Add another payer
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <button 
              onClick={() => setStep(1)}
              className="px-6 py-2.5 bg-secondary text-foreground font-bold rounded-full hover:bg-border transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => setStep(3)}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors"
            >
              Review & Create
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Review & Create</h2>
            <p className="text-sm text-muted-foreground">Please review your group details before creating.</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="font-bold text-foreground">Group Details</h3>
              <button onClick={() => setStep(1)} className="text-sm font-bold text-primary hover:underline">Edit</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div className="flex justify-between sm:block">
                <span className="text-muted-foreground">Group Name</span>
                <p className="font-medium text-foreground sm:mt-1">Rent Collection - January 2026</p>
              </div>
              <div className="flex justify-between sm:block">
                <span className="text-muted-foreground">Frequency</span>
                <p className="font-medium text-foreground sm:mt-1">Monthly</p>
              </div>
              <div className="flex justify-between sm:block">
                <span className="text-muted-foreground">Start Date</span>
                <p className="font-medium text-foreground sm:mt-1">Jan 1, 2026</p>
              </div>
              <div className="flex justify-between sm:block">
                <span className="text-muted-foreground">End Date</span>
                <p className="font-medium text-foreground sm:mt-1">Dec 1, 2026</p>
              </div>
              <div className="flex justify-between sm:block sm:col-span-2">
                <span className="text-muted-foreground">Payment Destination</span>
                <p className="font-medium text-foreground sm:mt-1">Landlord Chidi - Access Bank ••••1234</p>
              </div>
              <div className="flex justify-between sm:block sm:col-span-2">
                <span className="text-muted-foreground">Visibility Setting</span>
                <p className="font-medium text-foreground sm:mt-1">Closed Group</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="font-bold text-foreground">Payers (5)</h3>
              <button onClick={() => setStep(2)} className="text-sm font-bold text-primary hover:underline">Edit</button>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { name: 'Alice Johnson', email: 'alice@gmail.com', amount: '100,000' },
                { name: 'Bob Smith', email: 'bob@gmail.com', amount: '100,000' },
                { name: 'Charlie Brown', email: 'charlie@gmail.com', amount: '100,000' },
                { name: 'Diana Prince', email: 'diana@gmail.com', amount: '100,000' },
                { name: 'Edward Nwosu', email: 'edward@gmail.com', amount: '100,000' },
              ].map((payer, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm py-1 border-b border-border/50 last:border-0">
                  <span className="font-medium text-foreground w-1/3">{payer.name}</span>
                  <span className="text-muted-foreground w-1/3">{payer.email}</span>
                  <span className="font-bold text-foreground w-1/3 text-right">₦{payer.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button 
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-secondary text-foreground font-bold rounded-full hover:bg-border transition-colors"
            >
              Back
            </button>
            <Link 
              href="/dashboard/groups/rent-collection-jan-2026"
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors"
            >
              Create Group
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
