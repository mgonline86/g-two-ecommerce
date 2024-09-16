import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import ProductList from "./pages/ProductList";

import CartPage from "./pages/CartPage";
import "./App.css";
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import WishListPage from "./pages/WishListPage";
function App() {
  const [cart, setCart] = useState({});
  const [wishList, setWishList] = useState({});
  const [firstRender, setFirstRender] = useState(true);

  /** Synchronizing with Local Storage */
  useEffect(() => {
    function setDataFromLocalStorage() {
      const cartFromLocalStorage = localStorage.getItem("cart");
      const wishListFromLocalStorage = localStorage.getItem("wishList");
      if (cartFromLocalStorage) {
        setCart(JSON.parse(cartFromLocalStorage));
      }
      if (wishListFromLocalStorage) {
        setWishList(JSON.parse(wishListFromLocalStorage));
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

  const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
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
      removeFromCart(productId);
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
  return (
<CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        wishList,
        toggleWish,
        updateCartQty,
      }}
    >
      <BrowserRouter>
        <div>
          <CustomNavbar />

          <Routes>
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishListPage />} />
            <Route path="/" element={<ProductList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
