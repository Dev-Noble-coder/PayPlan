'use client';

import { Hexagon, Lock, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function PayPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
        
        {/* Left Side: Summary */}
        <div className="bg-secondary/50 p-8 sm:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border">
          <div className="flex flex-col gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2 text-foreground">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-black font-extrabold text-lg leading-none">P</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">PayPlan</span>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">You're invited to join</p>
                <h1 className="text-3xl font-bold text-foreground">Rent Collection - January 2026</h1>
              </div>

              <div className="flex flex-col gap-4 text-sm mt-4">
                <div className="flex justify-between border-b border-border/50 pb-4">
                  <span className="text-muted-foreground">Amount</span>
                  <div className="text-right">
                    <span className="font-bold text-foreground block">₦100,000</span>
                    <span className="text-xs text-muted-foreground">per month</span>
                  </div>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-4">
                  <span className="text-muted-foreground">Frequency</span>
                  <span className="font-medium text-foreground">Monthly</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-4">
                  <span className="text-muted-foreground">First Charge</span>
                  <div className="text-right">
                    <span className="font-bold text-foreground block">₦100,000</span>
                    <span className="text-xs text-muted-foreground">on Jan 1, 2026</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 pt-2">
                  <span className="text-xs text-muted-foreground">Payments go to</span>
                  <span className="font-medium text-foreground">Landlord Chidi - Access Bank ••••1234</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            Need help? <a href="#" className="font-bold text-primary hover:underline">Contact the organizer.</a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Set up your payment</h2>
            <p className="text-sm text-muted-foreground">Enter your card details to start automatic payments.</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-foreground">Card Information</h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-muted-foreground">Card number</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="4242 4242 4242 4242" 
                      className="w-full pl-4 pr-12 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold italic">VISA</div>
                      <div className="w-8 h-5 bg-gray-800 rounded flex items-center justify-center text-[8px] text-white font-bold">MC</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-muted-foreground">Expiry date</label>
                    <input 
                      type="text" 
                      placeholder="MM / YY" 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-muted-foreground">CVC</label>
                    <input 
                      type="text" 
                      placeholder="123" 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-muted-foreground">Cardholder name</label>
                  <input 
                    type="text" 
                    defaultValue="Alice Johnson"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <button className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-sm">
                Authorize & Start Payments
              </button>
              
              <p className="text-xs text-muted-foreground text-center px-4 leading-relaxed">
                By continuing, you authorize PayPlan to charge your card ₦100,000 every month starting Jan 1, 2026.
              </p>
            </div>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
            <Lock size={14} className="text-success" />
            Powered by <span className="font-bold text-foreground">Sub</span> (PCI DSS Compliant)
          </div>
        </div>
      </div>
    </div>
  );
}
