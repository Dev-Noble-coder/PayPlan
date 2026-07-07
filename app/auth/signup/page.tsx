'use client';

import React, { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Eye, EyeSlash } from 'iconsax-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json().catch(() => ({}));
      
      if (!res.ok) {
        throw new Error(data.detail || data.message || data.error || 'Failed to sign up');
      }
      
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side: Branding / Graphic */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/finance-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/75 z-0"></div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              <span className="leading-none tracking-tighter">P</span>
            </div>
            PayPlan
          </Link>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold font-brand tracking-tight leading-tight mb-4">
            Simplify your recurring payments.
          </h2>
          <p className="text-white/80 text-lg">
            Manage subscriptions, split bills with friends, and never miss a payment with PayPlan.
          </p>
        </div>
        
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl z-0"></div>
      </div>

      {/* Right side: Signup Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 relative bg-white">
        <header className="absolute top-8 left-6 lg:left-12 lg:hidden">
          <Link href="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary text-foreground transition-colors border border-border bg-white">
            <ArrowLeft size={20} />
          </Link>
        </header>

        <div className="w-full mx-auto mt-16 lg:mt-0 py-12 lg:py-0">
          <div className="mb-10">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 text-foreground mb-8 lg:hidden">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-black font-extrabold text-lg leading-none">P</span>
              </div>
              <span className="font-bold text-xl tracking-tight">PayPlan</span>
            </div>

            <h1 className="text-4xl font-bold text-foreground leading-[1.1] font-brand tracking-tight mb-3">
              Create an account
            </h1>
            <p className="text-muted-foreground text-[15px]">
              Sign up to start managing your mandates easily.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="space-y-1.5 flex-1">
                <label className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">First Name</label>
                <input 
                  type="text" 
                  name="first_name"
                  placeholder="John"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border px-4 py-3 text-[15px] text-foreground outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <label className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Last Name</label>
                <input 
                  type="text" 
                  name="last_name"
                  placeholder="Doe"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border px-4 py-3 text-[15px] text-foreground outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Email address</label>
              <input 
                type="email" 
                name="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-border px-4 py-3 text-[15px] text-foreground outline-none focus:border-primary transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border px-4 py-3 pr-10 text-[15px] text-foreground outline-none focus:border-primary transition-all"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors outline-none"
                >
                  {showPassword ? <EyeSlash size="20" color="currentColor" /> : <Eye size="20" color="currentColor" />}
                </button>
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-full hover:bg-primary/90 active:scale-[0.98] transition-all flex justify-center items-center gap-2 mt-8 disabled:opacity-70 disabled:cursor-not-allowed">
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="mt-8 text-center text-[15px] text-muted-foreground">
            Already have an account? <Link href="/auth/login" className="font-semibold text-primary hover:underline">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
