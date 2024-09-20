import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import ProductList from "./pages/ProductList";

import CartPage from "./pages/CartPage";
import "./App.css";
import { useEffect, useState } from "react";
import { AppContext } from "./context";
import WishListPage from "./pages/WishListPage";
import LoginPage from "./pages/LoginPage";
import { getLocalStorage, getSessionStorage, updateLocalStorage } from "./lib/helpers";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
  const [firstRender, setFirstRender] = useState(true);
  const [cart, setCart] = useState({});
  const [wishList, setWishList] = useState({});
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  /** Synchronizing with Local Storage */
  useEffect(() => {
    function setDataFromLocalStorage() {
      const cartFromLocalStorage = getLocalStorage("cart");
      const wishListFromLocalStorage = getLocalStorage("wishList");
      const userFromLocalStorage = getLocalStorage("user") || getSessionStorage("user");
      if (userFromLocalStorage) {
        setUser(userFromLocalStorage);
        setIsLogged(true);
      }
      if (cartFromLocalStorage) {
        setCart(cartFromLocalStorage);
      }
      if (wishListFromLocalStorage) {
        setWishList(wishListFromLocalStorage);
      }
      setFirstRender(false);
    }
    if (firstRender) {
      setDataFromLocalStorage();
    } else {
      updateLocalStorage("cart", cart);
      updateLocalStorage("wishList", wishList);
    }
  }, [cart, wishList, firstRender]);

  const addToCart = (product) => {
    const strId = String(product.id);
    if (cart[strId]) {
      setCart((prev) => ({
        ...prev,
        [strId]: { ...prev[strId], qty: prev[strId].qty + 1 },
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        [strId]: { product, qty: 1, timestamp: Date.now() },
      }));
    }
  };

  const removeFromCart = (id) => {
    const strId = String(id);
    if (cart[strId]) {
      setCart((prev) => {
        // remove cost key from object
        const { [strId]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const updateCartQty = (productId, qty) => {
    const strId = String(productId);
    if (qty < 1) {
      return;
    }

    if (cart[strId]) {
      setCart((prev) => ({
        ...prev,
        [strId]: { ...prev[strId], qty },
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        [strId]: { ...prev[strId], qty },
      }));
    }
  };

  const toggleWish = (product) => {
    setWishList((prevState) => {
      const inWishList = prevState[product.id];
      if (inWishList) {
        const newState = { ...prevState };
        delete newState[product.id];
        return newState;
      } else {
        return { ...prevState, [product.id]: product };
      }
    });
  };
  return (
    <AppContext.Provider
      value={{
        currency: "EGP",
        cart,
        addToCart,
        removeFromCart,
        wishList,
        toggleWish,
        updateCartQty,
        user,
        setUser,
        isLogged,
        setIsLogged,
      }}
    >
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route element={<ProtectedRoute isLogged={isLogged} />}>
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishListPage />} />
            <Route path="/" element={<ProductList />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
