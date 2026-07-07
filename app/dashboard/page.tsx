import { 
  Users, 
  ArrowUp, 
  ChevronDown, 
  Plus, 
  UserPlus, 
  LayoutGrid, 
  Landmark,
  Wallet
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        
        <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm font-medium cursor-pointer">
          This cycle
          <ChevronDown size={16} className="text-muted-foreground" />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Expected */}
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
          <p className="text-sm font-medium text-muted-foreground">Total Expected</p>
          <div>
            <h2 className="text-3xl font-bold text-foreground">₦500,000</h2>
            <p className="text-sm text-muted-foreground mt-1">5 payers</p>
          </div>
        </div>

        {/* Total Collected */}
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
          <p className="text-sm font-medium text-muted-foreground">Total Collected</p>
          <div>
            <h2 className="text-3xl font-bold text-foreground">₦375,000</h2>
            <p className="text-sm text-muted-foreground mt-1">3 payers</p>
          </div>
        </div>

        {/* Collection Rate */}
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
          <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-3">75%</h2>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-3">
              <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-success">
              <ArrowUp size={14} />
              <span>12% vs last cycle</span>
            </div>
          </div>
        </div>

        {/* Active Payers */}
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-muted-foreground">Active Payers</p>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Users size={20} />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-1">3/5</h2>
            <p className="text-sm text-muted-foreground">60% active</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Groups */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Recent Groups</h2>
            <Link href="/dashboard/groups" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex flex-col">
              {/* Group Item 1 */}
              <div className="p-5 border-b border-border hover:bg-secondary/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Wallet size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Rent Collection - Jan 2026</h3>
                    <p className="text-sm text-muted-foreground">Monthly - Next payment: Jan 1, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-bold text-xs">75%</span>
                  <span className="text-sm font-medium text-muted-foreground">₦375,000 / ₦500,000</span>
                </div>
              </div>

              {/* Group Item 2 */}
              <div className="p-5 border-b border-border hover:bg-secondary/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Wallet size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">School Fees - Term 2</h3>
                    <p className="text-sm text-muted-foreground">Quarterly - Next payment: Feb 1, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive font-bold text-xs">40%</span>
                  <span className="text-sm font-medium text-muted-foreground">₦200,000 / ₦500,000</span>
                </div>
              </div>

              {/* Group Item 3 */}
              <div className="p-5 hover:bg-secondary/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Wallet size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Club Dues - 2026</h3>
                    <p className="text-sm text-muted-foreground">Yearly - Next payment: Jan 15, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-success/10 text-success font-bold text-xs">100%</span>
                  <span className="text-sm font-medium text-muted-foreground">₦50,000 / ₦50,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
          
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex flex-col">
              <Link href="/dashboard/groups/create" className="p-4 border-b border-border flex items-center justify-between hover:bg-secondary/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    <Plus size={20} />
                  </div>
                  <span className="font-medium text-sm">Create New Group</span>
                </div>
                <ChevronDown size={16} className="text-muted-foreground -rotate-90" />
              </Link>
              
              <Link href="/dashboard/payers/add" className="p-4 border-b border-border flex items-center justify-between hover:bg-secondary/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    <UserPlus size={20} />
                  </div>
                  <span className="font-medium text-sm">Add Payer</span>
                </div>
                <ChevronDown size={16} className="text-muted-foreground -rotate-90" />
              </Link>

              <Link href="/dashboard/groups" className="p-4 border-b border-border flex items-center justify-between hover:bg-secondary/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    <LayoutGrid size={20} />
                  </div>
                  <span className="font-medium text-sm">View All Groups</span>
                </div>
                <ChevronDown size={16} className="text-muted-foreground -rotate-90" />
              </Link>

              <Link href="/dashboard/bank-accounts" className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    <Landmark size={20} />
                  </div>
                  <span className="font-medium text-sm">Saved Bank Accounts</span>
                </div>
                <ChevronDown size={16} className="text-muted-foreground -rotate-90" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
