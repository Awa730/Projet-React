import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/dashboard/Home";
import Dashboard from "./pages/dashboard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/dashboard/main" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
