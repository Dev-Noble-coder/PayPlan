'use client';

import React, { useEffect, useRef } from 'react';
import { useWebhooks } from './WebhookContext';
import { format } from 'date-fns';

export default function WebhookConsole() {
  const { events, clearEvents } = useWebhooks();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [events]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-green-400 font-mono text-[13px] relative">
      {/* Console Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 z-10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="font-semibold text-white/80 uppercase tracking-widest text-[11px] ml-2">Sub Infrastructure / Webhook Stream</span>
        </div>
        
        <button 
          onClick={clearEvents}
          className="text-xs text-white/50 hover:text-white transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Console Output */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {events.length === 0 ? (
          <div className="text-white/30 italic flex flex-col items-center justify-center h-full gap-2">
            <span className="animate-pulse">Waiting for events...</span>
          </div>
        ) : (
          events.slice().reverse().map((evt) => (
            <div key={evt.id} className="bg-white/5 border border-white/10 rounded-md p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-start mb-2">
                <span className="text-blue-400 font-bold">{evt.event}</span>
                <span className="text-white/40 text-xs">{format(new Date(evt.timestamp), 'HH:mm:ss.SSS')}</span>
              </div>
              <pre className="text-white/70 overflow-x-auto text-[12px] leading-relaxed">
                {JSON.stringify(evt.payload, null, 2)}
              </pre>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
