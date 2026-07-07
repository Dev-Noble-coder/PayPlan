import Link from 'next/link';
import { ArrowLeft, MessageSquare, Phone, Mail, FileText, HelpCircle, ChevronRight } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    { q: "How do I create a new payment group?", a: "Go to the Groups tab and click 'Create New Group'. Follow the 3-step process to add details, invite payers, and confirm." },
    { q: "Can payers see who else has paid?", a: "It depends on your group's visibility settings. 'Closed Groups' hide other payers, while 'Open Groups' show overall progress." },
    { q: "How are payments processed?", a: "Payments are processed securely via our payment partners and settled directly to your connected bank account within 24 hours." },
    { q: "What happens if a payment fails?", a: "PayPlan automatically notifies the payer and provides a retry link. You can also manually resend payment requests from the Quick Actions menu." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="h-16 border-b border-border bg-card flex items-center px-4 md:px-8 shrink-0 relative z-40">
        <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium text-sm">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <div className="mx-auto flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <span className="text-black font-extrabold text-sm leading-none">P</span>
          </div>
          <span className="font-bold text-lg tracking-tight">PayPlan</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto py-12 px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-3xl font-bold">How can we help you?</h1>
          <p className="text-muted-foreground max-w-lg">Search our knowledge base or get in touch with our support team for any issues you are facing.</p>
          
          <div className="w-full max-w-md relative mt-4">
            <input 
              type="text" 
              placeholder="Search for articles..." 
              className="w-full pl-5 pr-4 py-3 border border-border rounded-full text-sm bg-card focus:outline-none focus:border-primary shadow-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="flex flex-col items-center text-center gap-3 p-6 border border-border bg-card rounded-2xl hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <MessageSquare size={24} />
            </div>
            <h3 className="font-bold">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Chat with our support team in real-time.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3 p-6 border border-border bg-card rounded-2xl hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Mail size={24} />
            </div>
            <h3 className="font-bold">Email Support</h3>
            <p className="text-sm text-muted-foreground">Send us an email and we'll reply within 24h.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3 p-6 border border-border bg-card rounded-2xl hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Phone size={24} />
            </div>
            <h3 className="font-bold">Phone Support</h3>
            <p className="text-sm text-muted-foreground">Call us directly during business hours.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText size={20} className="text-primary" /> Popular Articles
            </h2>
            <div className="flex flex-col gap-3">
              {['Getting Started with PayPlan', 'How to link your bank account', 'Understanding Group Visibility', 'Managing failed payments', 'Exporting transaction reports'].map((article, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border bg-card rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors group">
                  <span className="text-sm font-medium">{article}</span>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <HelpCircle size={20} className="text-primary" /> Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <div key={i} className="flex flex-col gap-2 p-4 border border-border bg-card rounded-xl">
                  <h3 className="text-sm font-bold">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
