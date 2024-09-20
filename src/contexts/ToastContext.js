import { createContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const value = {
    setToasts,
    toasts,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export default ToastContext;
