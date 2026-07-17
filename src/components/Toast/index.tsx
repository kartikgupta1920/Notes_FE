import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckIcon, AlertCircleIcon, SparklesIcon, XIcon } from '../Icons';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckIcon width={18} height={18} />,
  error: <AlertCircleIcon width={18} height={18} />,
  info: <SparklesIcon width={16} height={16} />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++counter.current;
    setToasts((t) => [...t, { id, type, message }]);
    window.setTimeout(() => dismiss(id), 3400);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-region" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`} role="status">
            <span className="toast-icon">{icons[toast.type]}</span>
            <span className="toast-message">{toast.message}</span>
            <button className="toast-close" onClick={() => dismiss(toast.id)} aria-label="Dismiss">
              <XIcon width={14} height={14} />
            </button>
            <span className="toast-bar" />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const noopToast: ToastContextValue = { showToast: () => {} };

export function useToast() {
  const ctx = useContext(ToastContext);
  // Falls back to a no-op outside of ToastProvider (e.g. isolated unit tests)
  // instead of throwing, so consumers never need to worry about the provider.
  return ctx ?? noopToast;
}
