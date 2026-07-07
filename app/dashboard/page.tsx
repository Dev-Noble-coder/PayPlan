'use client';

import React, { useEffect, useState } from 'react';
import { useWebhooks } from '@/components/WebhookContext';
import { PayPlan } from '@/lib/api/services';
import { Bell, Plus, User } from 'lucide-react';
import { format } from 'date-fns';

const MOCK_PLANS: PayPlan[] = [
  {
    sqid: 'plan_01',
    title: 'Monthly Parents Allowance',
    description: 'Sending money home',
    amount: '30000.00',
    currency: 'NGN',
    frequency: 'MONTHLY',
    status: 'ACTIVE_RENEWING',
    receiver_name: 'Parents',
    creator_name: 'Tobi',
    payment_link_token: 'tok_123',
    next_billing_date: new Date(Date.now() + 15 * 86400000).toISOString(),
  },
  {
    sqid: 'plan_02',
    title: 'Flat 4 Electricity Bill',
    description: 'Split amongst 4 flatmates',
    amount: '10000.00',
    currency: 'NGN',
    frequency: 'MONTHLY',
    status: 'ACTIVE_NON_RENEWING',
    receiver_name: 'Ikeja Electric',
    creator_name: 'Tobi',
    payment_link_token: 'tok_456',
    next_billing_date: new Date(Date.now() + 12 * 86400000).toISOString(),
  },
  {
    sqid: 'plan_03',
    title: 'Ajo Contribution',
    description: 'Monthly savings group',
    amount: '50000.00',
    currency: 'NGN',
    frequency: 'MONTHLY',
    status: 'PAST_DUE',
    receiver_name: 'Group Admin',
    creator_name: 'Tobi',
    payment_link_token: 'tok_789',
    next_billing_date: new Date(Date.now() - 2 * 86400000).toISOString(),
  }
];

const StatusBadge = ({ status }: { status: PayPlan['status'] }) => {
  switch (status) {
    case 'ACTIVE_RENEWING':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700 border border-green-200"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Auto Renewing</span>;
    case 'ACTIVE_NON_RENEWING':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 border border-amber-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Ending Soon</span>;
    case 'PAST_DUE':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-200"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Action Required</span>;
    case 'CANCELLED':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-200"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Expired</span>;
    default:
      return null;
  }
};

export default function DashboardPage() {
  const [plans, setPlans] = useState<PayPlan[]>(MOCK_PLANS);
  const { addEvent } = useWebhooks();

  // Simulate fetching data and emitting a webhook
  useEffect(() => {
    // Just to show something on initial load in the webhook console
    addEvent('app.dashboard_loaded', { user: 'Tobi', timestamp: new Date().toISOString() });
  }, [addEvent]);

  const handleAction = (plan: PayPlan) => {
    if (plan.status === 'ACTIVE_RENEWING') {
      // Simulate cancelling auto-renew
      addEvent('subscription.cancelled_at_period_end', {
        subscription_id: `sub_${plan.sqid}`,
        status: 'active_non_renewing'
      });
      setPlans(plans.map(p => p.sqid === plan.sqid ? { ...p, status: 'ACTIVE_NON_RENEWING' } : p));
    } else if (plan.status === 'PAST_DUE') {
      // Simulate payment recovery
      addEvent('subscription.activated', {
        subscription_id: `sub_${plan.sqid}`,
        status: 'active'
      });
      setPlans(plans.map(p => p.sqid === plan.sqid ? { ...p, status: 'ACTIVE_RENEWING' } : p));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      {/* Header */}
      <header className="px-5 pt-8 pb-4 bg-white sticky top-0 z-20 border-b border-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={20} />
            </div>
            <div>
              <h1 className="font-bold text-[18px] text-foreground">Hi, Tobi</h1>
              <p className="text-xs text-muted-foreground">Good morning</p>
            </div>
          </div>
          <button className="relative p-2 text-foreground hover:bg-secondary rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border border-white"></span>
          </button>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar border-b border-transparent">
          <button className="pb-3 text-sm font-bold border-b-2 border-primary text-foreground whitespace-nowrap">Active Mandates</button>
          <button className="pb-3 text-sm font-medium text-muted-foreground whitespace-nowrap">Completed</button>
          <button className="pb-3 text-sm font-medium text-muted-foreground whitespace-nowrap">Requests</button>
        </div>
      </header>

      {/* Content */}
      <div className="p-5 flex-1 overflow-y-auto">
        <div className="space-y-4 pb-20">
          {plans.map((plan) => (
            <div key={plan.sqid} className="bg-white rounded-2xl p-5 shadow-sm border border-border flex flex-col gap-4 relative overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground text-[16px] leading-tight">{plan.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">To: {plan.receiver_name}</p>
                </div>
                <StatusBadge status={plan.status} />
              </div>

              <div className="flex justify-between items-end mt-2">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Amount</p>
                  <p className="font-sans font-bold text-[20px] text-foreground">₦{parseFloat(plan.amount).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Next Billing</p>
                  <p className="text-sm font-medium text-foreground">{format(new Date(plan.next_billing_date), 'MMM dd, yyyy')}</p>
                </div>
              </div>

              {/* Action Buttons based on state */}
              {plan.status === 'ACTIVE_RENEWING' && (
                <button 
                  onClick={() => handleAction(plan)}
                  className="mt-2 w-full py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary active:scale-[0.98] transition-all"
                >
                  Turn Off Auto-Renew
                </button>
              )}
              {plan.status === 'ACTIVE_NON_RENEWING' && (
                <div className="mt-2 w-full py-2.5 rounded-xl bg-amber-50 text-amber-700 text-sm font-medium text-center border border-amber-100">
                  Access expires in {Math.ceil((new Date(plan.next_billing_date).getTime() - Date.now()) / (1000 * 3600 * 24))} days
                </div>
              )}
              {plan.status === 'PAST_DUE' && (
                <div className="mt-2 w-full flex flex-col gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-xs text-red-700">Card renewal failed. Transfer ₦{parseFloat(plan.amount).toLocaleString()} to the secure backup account below.</p>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-red-100">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Nomba Bank</p>
                      <p className="font-mono font-bold text-sm">9901234567</p>
                    </div>
                    <button 
                      onClick={() => handleAction(plan)}
                      className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors"
                    >
                      I have paid
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-6 right-6 z-20">
        <button className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
