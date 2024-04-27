import React from "react";
import RegisterUserPage from "./pages/RegisterUserPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserLoginPage from "./pages/UserLoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import HomePage from "./pages/HomePage";
import CategoryListPage from "./pages/CategoryListPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/category" element={<CategoryListPage />} />
          </Route>
          <Route path="/register" element={<RegisterUserPage />} />
          <Route path="/login" element={<UserLoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
