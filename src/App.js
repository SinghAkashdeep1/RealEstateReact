import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Admin/Auth/Login";
import ForgotPassword from "./pages/Admin/Auth/ForgotPassword";
import AdminLayout from "./components/Admin/Layout";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Layouts from "./components/user/Layouts";
import Home from "./components/user/Home";
import Sell from "./pages/User/Sell";
import Buy from "./pages/User/Buy";
import BuyProperty from "./pages/User/BuyProperty";

function App() {
  const notify = () => toast("Wow so easy!");

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Layouts>
                <Home />
              </Layouts>
            </>
          }
        />
        <Route
          path="/add-property"
          element={
            <>
              <Layouts>
                <Sell />
              </Layouts>
            </>
          }
        />
        <Route
          path="/buy-property"
          element={
            <>
              <Layouts>
                <Buy />
              </Layouts>
            </>
          }
        />


        <Route
          path="/property/details/:id"
          element={
            <>
              <Layouts>
                <BuyProperty />{" "}
              </Layouts>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
