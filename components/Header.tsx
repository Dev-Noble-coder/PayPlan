'use client';

import { Bell, ChevronDown, Menu, LogOut, Settings, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setWorkspaceOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-8 shrink-0 relative z-40">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full"
        >
          <Menu size={24} />
        </button>

        {/* Workspace Switcher */}
        <div className="hidden md:flex relative" ref={workspaceRef}>
          <div 
            onClick={() => setWorkspaceOpen(!workspaceOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:bg-secondary cursor-pointer transition-colors"
          >
            <span className="text-sm font-medium">Greenfield Estate</span>
            <ChevronDown size={16} className={`text-muted-foreground transition-transform ${workspaceOpen ? 'rotate-180' : ''}`} />
          </div>
          
          {workspaceOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 z-50">
              <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Workspaces</div>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary flex items-center gap-2 font-medium bg-primary/5">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Greenfield Estate
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-secondary flex items-center gap-2 font-medium">
                <div className="w-2 h-2 rounded-full border border-muted-foreground"></div>
                Personal
              </button>
              <div className="h-px bg-border my-2"></div>
              <button className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-secondary font-bold">
                + New Workspace
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
        </button>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <div 
            className="flex items-center gap-3 cursor-pointer p-1 pr-2 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="w-9 h-9 rounded-full bg-[#E57A44] flex items-center justify-center text-white font-bold text-sm">
              OO
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-bold text-foreground leading-tight">Olivia Okoro</span>
              <span className="text-xs text-muted-foreground font-medium">Organizer</span>
            </div>
            <ChevronDown size={16} className={`hidden md:block text-muted-foreground transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </div>

          {profileOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 z-50">
              <div className="px-4 py-3 border-b border-border mb-2 flex flex-col md:hidden">
                <span className="text-sm font-bold text-foreground">Olivia Okoro</span>
                <span className="text-xs text-muted-foreground">olivia@example.com</span>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary flex items-center gap-3 font-medium transition-colors">
                <User size={16} className="text-muted-foreground" />
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary flex items-center gap-3 font-medium transition-colors">
                <Settings size={16} className="text-muted-foreground" />
                Settings
              </button>
              <div className="h-px bg-border my-2"></div>
              <button className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 flex items-center gap-3 font-bold transition-colors">
                <LogOut size={16} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
