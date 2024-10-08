import { createContext, useEffect, useState } from "react";
import {
  getLocalStorage,
  updateLocalStorage,
} from "../lib/helpers";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [firstRender, setFirstRender] = useState(true);

  const [wishList, setWishList] = useState({});

  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  /** Synchronizing with Local Storage */
  useEffect(() => {
    function setDataFromLocalStorage() {
      const cartFromLocalStorage = getLocalStorage("cart");
      const wishListFromLocalStorage = getLocalStorage("wishList");
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

  const value = {
    currency: "EGP",
    cart,
    setCart,
    addToCart,
    removeFromCart,
    wishList,
    toggleWish,
    updateCartQty,
    handleCloseCart,
    handleShowCart,
    showCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
