import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import ProductList from "./pages/ProductList";

import "./App.css";
import { AppProvider } from "./contexts/AppContext";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import WishListPage from "./pages/WishListPage";
// import ProtectedRoute from "./pages/ProtectedRoute";
import CartDrawer from "./components/CartDrawer";
import CustomToastContainer from "./components/CustomToastContainer";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <CartDrawer />
            <CustomNavbar />
            <CustomToastContainer />
            <Routes>
              <Route path="login" element={<LoginPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<WishListPage />} />
              <Route path="/" element={<ProductList />} />
              <Route path="*" element={<NotFoundPage />} />
              {/* <Route element={<ProtectedRoute />}></Route> */}
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
