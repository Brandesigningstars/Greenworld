import { createContext, useContext, useEffect, ReactNode } from 'react';

// MongoDB Schema Interface for Visitor Analytics (for future backend integration)
export interface VisitorSchema {
  _id?: string;
  sessionId: string;
  ipAddress?: string;
  userAgent?: string;
  visitedAt: Date;
  pages: string[];
  duration?: number;
  referrer?: string;
}

interface VisitorContextType {
  trackPageView: (page: string) => void;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export function VisitorProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize visitor tracking
    const sessionId = getOrCreateSessionId();
    trackVisitor(sessionId);
  }, []);

  const getOrCreateSessionId = (): string => {
    let sessionId = sessionStorage.getItem('visitorSessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('visitorSessionId', sessionId);
    }
    return sessionId;
  };

  const trackVisitor = async (sessionId: string) => {
    // TODO: Replace with actual MongoDB API call
    // Example:
    // await fetch('/api/visitors/track', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     sessionId,
    //     userAgent: navigator.userAgent,
    //     visitedAt: new Date(),
    //     referrer: document.referrer
    //   })
    // });

    // For now, store in localStorage for demo
    const visitors = JSON.parse(localStorage.getItem('visitorData') || '[]');
    const existingVisitor = visitors.find((v: any) => v.sessionId === sessionId);
    
    if (!existingVisitor) {
      visitors.push({
        sessionId,
        userAgent: navigator.userAgent,
        visitedAt: new Date().toISOString(),
        pages: [window.location.pathname],
        referrer: document.referrer
      });
      localStorage.setItem('visitorData', JSON.stringify(visitors));
    }
  };

  const trackPageView = (page: string) => {
    // TODO: Update page views in MongoDB
    console.log('Page view tracked:', page);
  };

  return (
    <VisitorContext.Provider value={{ trackPageView }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  const context = useContext(VisitorContext);
  if (context === undefined) {
    throw new Error('useVisitor must be used within a VisitorProvider');
  }
  return context;
}
