import { useEffect } from "react";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AuthProvider>
      <ScrollToTop />
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
