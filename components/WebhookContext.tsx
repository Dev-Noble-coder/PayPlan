'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface WebhookEvent {
  id: string;
  timestamp: string;
  event: string;
  payload: any;
}

interface WebhookContextType {
  events: WebhookEvent[];
  addEvent: (event: string, payload: any) => void;
  clearEvents: () => void;
}

const WebhookContext = createContext<WebhookContextType | undefined>(undefined);

export function WebhookProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<WebhookEvent[]>([]);

  const addEvent = useCallback((event: string, payload: any) => {
    setEvents((prev) => [
      {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        event,
        payload,
      },
      ...prev,
    ]);
  }, []);

  const clearEvents = useCallback(() => setEvents([]), []);

  return (
    <WebhookContext.Provider value={{ events, addEvent, clearEvents }}>
      {children}
    </WebhookContext.Provider>
  );
}

export function useWebhooks() {
  const context = useContext(WebhookContext);
  if (context === undefined) {
    throw new Error('useWebhooks must be used within a WebhookProvider');
  }
  return context;
}
