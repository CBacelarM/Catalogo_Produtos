import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const lightTheme = {
  background: "#F9FAFB",
  cardBackground: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E5E7EB",
  inputBackground: "#FFFFFF",
  primary: "#3B82F6",
  primaryHover: "#2563EB",
  danger: "#EF4444",
  dangerHover: "#DC2626",
  success: "#10B981",
  warning: "#F59E0B",
  overlay: "rgba(0,0,0,0.5)",
  statusSuccess: { bg: "#D1FAE5", color: "#065F46" },
  statusWarning: { bg: "#FEF3C7", color: "#92400E" },
  statusDanger: { bg: "#FEE2E2", color: "#991B1B" }
};

export const darkTheme = {
  background: "#111827",
  cardBackground: "#1F2937",
  text: "#F9FAFB",
  textSecondary: "#D1D5DB",
  textMuted: "#9CA3AF",
  border: "#374151",
  inputBackground: "#374151",
  primary: "#3B82F6",
  primaryHover: "#60A5FA",
  danger: "#EF4444",
  dangerHover: "#F87171",
  success: "#10B981",
  warning: "#F59E0B",
  overlay: "rgba(0,0,0,0.7)",
  statusSuccess: { bg: "#065F46", color: "#D1FAE5" },
  statusWarning: { bg: "#92400E", color: "#FEF3C7" },
  statusDanger: { bg: "#991B1B", color: "#FEE2E2" }
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
