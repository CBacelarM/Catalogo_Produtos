import Home from "./pages/Home";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div style={{
        background: isDarkMode ? "#111827" : "#F9FAFB",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.3s ease"
      }}>
        <Home />
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;