import { useEffect, useRef } from "react";
import { getThemeColors } from "../constants/theme";

function Modal({
  isOpen,
  onClose,
  title,
  titleId,
  children,
  isDarkMode,
  maxWidth = "500px",
  closeOnOverlayClick = true
}) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const c = getThemeColors(isDarkMode);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement;

    const focusable = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: c.overlay,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{
          position: "relative",
          background: c.bgSecondary,
          color: c.textPrimary,
          padding: "20px",
          borderRadius: "12px",
          width: "90%",
          maxWidth,
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2
            id={titleId}
            style={{ marginTop: 0, marginBottom: "15px", color: c.textPrimary }}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}

export default Modal;
