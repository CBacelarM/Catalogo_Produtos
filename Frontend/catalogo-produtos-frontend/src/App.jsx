import Home from "./pages/Home";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

function AppContent() {
  const { theme } = useTheme();

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
        background: theme.background,
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        color: theme.text,
        transition: "background-color 0.3s ease, color 0.3s ease"
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
