'use client';

import React, { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Eye, EyeSlash } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json().catch(() => ({}));
      
      if (!res.ok) {
        throw new Error(data.detail || data.message || data.error || 'Failed to login');
      }
      
      toast.success('Logged in successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side: Branding / Graphic (hidden on mobile) */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/finance-bg.png')" }}
      >
        {/* Dark overlay for contrast */}
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
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl z-0"></div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 relative bg-white">
        {/* Mobile Header / Back Button */}
        <header className="absolute top-8 left-6 lg:left-12 lg:hidden">
          <Link href="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary text-foreground transition-colors border border-border bg-white">
            <ArrowLeft size={20} />
          </Link>
        </header>

        <div className="w-full  mx-auto mt-16 lg:mt-0">
          <div className="mb-10">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 text-foreground mb-8 lg:hidden">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-black font-extrabold text-lg leading-none">P</span>
              </div>
              <span className="font-bold text-xl tracking-tight">PayPlan</span>
            </div>

            <h1 className="text-4xl font-bold text-foreground leading-[1.1] font-brand tracking-tight mb-3">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-[15px]">
              Sign in to your account to manage your mandates.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
              {loading ? "Signing in..." : "Continue"}
            </button>
          </form>
{/* 
          <div className="my-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-border"></div>
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">or</span>
            <div className="h-[1px] flex-1 bg-border"></div>
          </div>

          <button className="w-full bg-white border border-border rounded-full py-3 flex items-center justify-center gap-3 text-[15px] font-semibold text-foreground hover:bg-secondary active:scale-[0.98] transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button> */}

          <p className="mt-8 text-center text-[15px] text-muted-foreground">
            Don't have an account? <Link href="/auth/signup" className="font-semibold text-primary hover:underline">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
