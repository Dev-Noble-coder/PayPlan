'use client';

import React, { useEffect, useState } from 'react';
import { useWebhooks } from '@/components/WebhookContext';
import { ShieldCheck, CreditCard, Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

export default function GuestCheckoutPage() {
  const { token } = useParams();
  const { addEvent } = useWebhooks();
  const [step, setStep] = useState<'checkout' | 'success' | 'onboarding'>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    addEvent('page.viewed', { path: `/pay/${token}`, user_type: 'guest' });
  }, [addEvent, token]);

  const handlePayment = () => {
    setIsProcessing(true);
    addEvent('payment.initiated', { method: paymentMethod, amount: 50000 });
    
    // Simulate network request
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      
      // Emit the webhook from Nomba integration
      addEvent('subscription.activated', {
        subscription_id: 'sub_01HXXXX',
        status: 'active',
        payment_token: token,
      });

      // Move to onboarding automatically after success
      setTimeout(() => {
        setStep('onboarding');
      }, 2500);

    }, 1500);
  };

  const handlePasswordSet = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent('customer.created', {
      email: 'segun@example.com',
      verified: true
    });
    toast.success('Account created successfully! Redirecting to dashboard...');
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full bg-white relative">
      {/* Header */}
      <header className="px-5 pt-8 pb-4 flex justify-between items-center bg-white border-b border-border sticky top-0 z-10">
        <div className="font-brand font-bold text-xl tracking-tight text-primary">PayPlan</div>
        <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
          <ShieldCheck size={14} /> Secure
        </div>
      </header>

      {/* Main Form Content */}
      <div className="flex-1 p-5 pb-24 overflow-y-auto">
        {step === 'checkout' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-bold text-foreground mb-2">Complete Payment</h1>
            <p className="text-muted-foreground text-sm mb-6">Tobi has requested a monthly rent mandate on PayPlan.</p>

            {/* Bill Summary Card */}
            <div className="bg-secondary/30 border border-border rounded-2xl p-5 mb-8">
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">Amount Due</span>
                <span className="text-sm font-medium text-foreground">₦50,000 / month</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">First Payment</span>
                <span className="text-sm font-medium text-foreground">Today</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-sans font-bold text-2xl text-foreground">₦50,000</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Payment Method</h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 p-4 rounded-3xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary/50'}`}
                >
                  <CreditCard size={24} />
                  <span className="text-sm font-semibold">Debit Card</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('bank')}
                  className={`flex-1 p-4 rounded-3xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'bank' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary/50'}`}
                >
                  <Landmark size={24} />
                  <span className="text-sm font-semibold">Transfer</span>
                </button>
              </div>
            </div>

            {/* Simulated Card Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-[13px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="h-[44px] px-3 bg-transparent border-b border-gray-200 text-gray-700 text-[15px] outline-none transition-all duration-300 focus:border-[#7e91a2] w-full" defaultValue="4532 0192 8832 9102" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="h-[44px] px-3 bg-transparent border-b border-gray-200 text-gray-700 text-[15px] outline-none transition-all duration-300 focus:border-[#7e91a2] w-full" defaultValue="12/26" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">CVV</label>
                    <input type="password" placeholder="123" className="h-[44px] px-3 bg-transparent border-b border-gray-200 text-gray-700 text-[15px] outline-none transition-all duration-300 focus:border-[#7e91a2] w-full" defaultValue="123" />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'bank' && (
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl mb-8">
                <p className="text-sm text-blue-800">You will be redirected to Nomba to complete the secure transfer.</p>
              </div>
            )}
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center h-64 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground text-center px-4">Your mandate has been activated. Processing next steps...</p>
          </div>
        )}

        {step === 'onboarding' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-8">
              <h2 className="text-[28px] leading-[1.2] font-bold text-foreground mb-3 max-w-[280px] mx-auto">Set your password to access your dashboard.</h2>
              <p className="text-muted-foreground">We've saved your details. Create a password to manage this and future mandates.</p>
            </div>

            <form onSubmit={handlePasswordSet} className="space-y-6">
              <div>
                <label className="block text-[13px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Email</label>
                <input type="email" value="segun@example.com" readOnly className="h-[44px] px-3 border-b border-gray-200 text-[15px] outline-none transition-all duration-300 focus:border-[#7e91a2] w-full bg-transparent text-muted-foreground" />
              </div>
              <div>
                <label className="block text-[13px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Create Password</label>
                <input type="password" required placeholder="Enter a secure password" className="h-[44px] px-3 bg-transparent border-b border-gray-200 text-gray-700 text-[15px] outline-none transition-all duration-300 focus:border-[#7e91a2] w-full" />
              </div>
              <button type="submit" className="h-[48px] w-full rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary-hover active:scale-[0.98] mt-4 flex items-center justify-center gap-2">
                Complete Setup <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Floating Checkout Button */}
      {step === 'checkout' && (
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent pt-12">
          <button 
            onClick={handlePayment} 
            disabled={isProcessing}
            className="h-[48px] w-full rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary-hover active:scale-[0.98] relative overflow-hidden group"
          >
            <span className={`transition-opacity duration-300 ${isProcessing ? 'opacity-0' : 'opacity-100'}`}>Pay ₦50,000</span>
            {isProcessing && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
