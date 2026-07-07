import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import WebhookConsole from "../components/WebhookConsole";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PayPlan | Peer-to-Peer Payments",
  description: "Powered by Sub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen overflow-hidden bg-secondary text-foreground`}
      >
        <Providers>
          <div className="flex h-full w-full">
            {/* Left Panel: PayPlan App (Max width 480px, centered in left half, or just let it take up space like a mobile app view) */}
            <div className="flex-1 flex justify-center bg-background border-r border-border h-full relative overflow-y-auto overflow-x-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
              <main className="w-full max-w-[480px] bg-white min-h-full flex flex-col relative shadow-sm">
                {children}
                
                {/* Powered by Sub Badge */}
                <div className="mt-auto pt-8 pb-6 text-center">
                  <div className="inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-secondary/50 border border-border/50">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Powered by Sub</span>
                    <span className="text-[10px] text-muted-foreground mt-1">Billing automation handled by Sub Infrastructure</span>
                  </div>
                </div>
              </main>
            </div>

            {/* Right Panel: Sub Infrastructure Webhook Console */}
            <div className="flex-1 h-full bg-[#0a0a0a] text-[#ededed] overflow-hidden flex flex-col">
              <WebhookConsole />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
