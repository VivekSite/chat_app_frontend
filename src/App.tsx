import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ProtectedRoutes from "./guards/ProtectedRoutes";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/reset_password" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/conversations" element={<HomePage />} />
          <Route path="/conversations/:conversationId" element={<HomePage />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
