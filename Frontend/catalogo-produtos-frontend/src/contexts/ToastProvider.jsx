import { useCallback, useState } from "react";
import { ToastContext } from "./toast-context";

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          role="alert"
          className={`toast toast--${toast.type}`}
          onClick={dismissToast}
        >
          <span>{toast.message}</span>
          <button type="button" className="toast__close" aria-label="Fechar">
            ×
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}
