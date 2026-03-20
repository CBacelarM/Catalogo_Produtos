import Home from "./pages/Home";

function App() {
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
        background: "#F9FAFB",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif"
      }}>
        <Home />
      </div>
    </>
  );
}

export default App;