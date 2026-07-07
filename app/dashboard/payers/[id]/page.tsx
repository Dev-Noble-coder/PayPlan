'use client';

import { ArrowLeft, MoreVertical, Pause, Edit2, Send, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function PayerViewPage() {
  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col gap-4">
        <Link href="/dashboard/groups/rent-collection-jan-2026" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground w-max transition-colors">
          <ArrowLeft size={16} /> Payers
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Alice Johnson</h1>
            <span className="px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-bold border border-success/20">Active</span>
          </div>
          <button className="p-2 text-muted-foreground hover:bg-secondary rounded-lg">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border overflow-x-auto no-scrollbar">
        <button className="pb-4 text-sm font-bold border-b-2 border-primary text-foreground whitespace-nowrap">
          Overview
        </button>
        <button className="pb-4 text-sm font-bold border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors">
          Payments
        </button>
        <button className="pb-4 text-sm font-bold border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors">
          Plan
        </button>
        <button className="pb-4 text-sm font-bold border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors">
          Activity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-6">
          <h3 className="font-bold text-foreground">Payer Information</h3>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">Alice Johnson</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">alice@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-bold">₦100,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-success font-bold">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined On</span>
              <span className="font-medium">Nov 20, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Payment</span>
              <span className="font-medium">Jan 1, 2026</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-6">
          <h3 className="font-bold text-foreground">Plan Details</h3>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frequency</span>
              <span className="font-medium">Monthly</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Start Date</span>
              <span className="font-medium">Jan 1, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Payment</span>
              <span className="font-medium">Jan 1, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium flex items-center gap-2">
                Visa •••• 4242
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-success font-bold">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <h3 className="font-bold text-foreground">Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-amber-200 bg-amber-50 text-amber-700 font-bold rounded-lg hover:bg-amber-100 transition-colors text-sm">
            <Pause size={16} /> Pause Payments
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors text-sm">
            <Edit2 size={16} /> Change Amount
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border bg-card text-foreground font-bold rounded-lg hover:bg-secondary transition-colors text-sm">
            <Send size={16} /> Resend Link
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-destructive/20 bg-destructive/10 text-destructive font-bold rounded-lg hover:bg-destructive/20 transition-colors text-sm">
            <Trash2 size={16} /> Remove from Group
          </button>
        </div>
      </div>
    </div>
  );
}
