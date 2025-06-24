import type React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "./components/ui/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes";

import "./styles/App.css";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navigation />
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
