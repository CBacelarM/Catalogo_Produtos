import Home from "./pages/Home";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { ToastProvider } from "./contexts/ToastProvider";
import { useTheme } from "./hooks/useTheme";

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        background: isDarkMode ? "#111827" : "#F9FAFB",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.3s ease"
      }}
    >
      <Home />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
