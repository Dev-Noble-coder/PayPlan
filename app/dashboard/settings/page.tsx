'use client';

import { useState } from 'react';
import { User, Bell, CreditCard, Shield, Globe, Smartphone, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="flex flex-col gap-6 pb-10 max-w-4xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {/* Sidebar Tabs */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:w-64 shrink-0 no-scrollbar pb-2 md:pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-secondary text-foreground" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="flex flex-col gap-8">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold text-foreground mb-6">Profile Information</h2>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-[#E57A44] flex items-center justify-center text-white font-bold text-2xl shrink-0">
                      OO
                    </div>
                    <div className="flex flex-col gap-3">
                      <button className="px-4 py-2 border border-border rounded-full text-sm font-bold hover:bg-secondary transition-colors w-max">
                        Change Avatar
                      </button>
                      <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-foreground">First Name</label>
                      <input type="text" defaultValue="Olivia" className="px-4 py-2.5 border border-border rounded-full bg-background focus:outline-none focus:border-primary text-sm transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-foreground">Last Name</label>
                      <input type="text" defaultValue="Okoro" className="px-4 py-2.5 border border-border rounded-full bg-background focus:outline-none focus:border-primary text-sm transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label className="text-sm font-bold text-foreground">Email Address</label>
                      <input type="email" defaultValue="olivia@example.com" className="px-4 py-2.5 border border-border rounded-full bg-background focus:outline-none focus:border-primary text-sm transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold text-foreground mb-6">Preferences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground">Language</label>
                    <select className="px-4 py-2.5 border border-border rounded-full bg-background focus:outline-none focus:border-primary text-sm appearance-none transition-colors">
                      <option>English (US)</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground">Timezone</label>
                    <select className="px-4 py-2.5 border border-border rounded-full bg-background focus:outline-none focus:border-primary text-sm appearance-none transition-colors">
                      <option>West Africa Time (WAT)</option>
                      <option>GMT</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold text-foreground mb-6">Notification Preferences</h2>
              <div className="flex flex-col gap-2">
                {[
                  { title: 'New Payments', desc: 'Get notified when a payer makes a successful payment.', email: true, push: true },
                  { title: 'Failed Payments', desc: 'Get notified when a payment attempt fails.', email: true, push: true },
                  { title: 'Weekly Summary', desc: 'Receive a weekly digest of your collection progress.', email: true, push: false },
                  { title: 'New Features', desc: 'Get updates about new features and improvements.', email: false, push: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="flex flex-col pr-4">
                      <span className="font-bold text-foreground text-sm">{item.title}</span>
                      <span className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</span>
                    </div>
                    <div className="flex items-center gap-5 shrink-0">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked={item.email} className="rounded text-primary focus:ring-primary bg-background border-border" />
                        <span className="text-xs font-bold text-muted-foreground">Email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked={item.push} className="rounded text-primary focus:ring-primary bg-background border-border" />
                        <span className="text-xs font-bold text-muted-foreground">Push</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors">
                  <Save size={16} />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold text-foreground mb-6">Security Settings</h2>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold text-foreground">Password</h3>
                    <p className="text-xs text-muted-foreground">Change your password to keep your account secure.</p>
                  </div>
                  <button className="px-5 py-2 border border-border rounded-full text-sm font-bold hover:bg-secondary transition-colors shrink-0">
                    Change Password
                  </button>
                </div>
                
                <div className="h-px bg-border"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold text-foreground">Two-Factor Authentication (2FA)</h3>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                  <button className="px-5 py-2 border border-border rounded-full text-sm font-bold hover:bg-secondary transition-colors shrink-0">
                    Enable 2FA
                  </button>
                </div>

                <div className="h-px bg-border"></div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-foreground mb-2">Active Sessions</h3>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-secondary rounded-full shrink-0">
                        <Globe size={20} className="text-muted-foreground" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-foreground">Chrome on Windows</span>
                        <span className="text-xs text-muted-foreground">Lagos, Nigeria • <span className="text-success font-medium">Current Session</span></span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-secondary rounded-full shrink-0">
                        <Smartphone size={20} className="text-muted-foreground" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-foreground">Safari on iPhone</span>
                        <span className="text-xs text-muted-foreground">Lagos, Nigeria • Last active 2 hours ago</span>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-destructive hover:underline px-2 py-1 rounded">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold text-foreground mb-6">Billing & Subscription</h2>
              <div className="flex flex-col gap-8">
                <div className="p-5 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-bold text-foreground">Professional Plan</span>
                    <span className="text-xs text-muted-foreground">₦5,000 / month. Renews on Jan 15, 2026.</span>
                  </div>
                  <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 transition-colors whitespace-nowrap shadow-sm">
                    Manage Plan
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-foreground">Payment Methods</h3>
                    <button className="text-sm font-bold text-primary hover:underline transition-colors">+ Add method</button>
                  </div>
                  <div className="p-4 border border-border rounded-2xl flex items-center justify-between hover:border-border/80 transition-colors bg-background/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-secondary rounded flex items-center justify-center font-bold text-xs text-muted-foreground border border-border">VISA</div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground">Visa ending in 4242</span>
                        <span className="text-xs text-muted-foreground mt-0.5">Expires 12/26</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-secondary text-muted-foreground text-[10px] uppercase tracking-wider font-bold rounded-full border border-border">Default</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
