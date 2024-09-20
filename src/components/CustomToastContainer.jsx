import { useContext } from "react";
import { ToastContainer } from "react-bootstrap";
import ToastContext from "../contexts/ToastContext";
import CustomToast from "./CustomToast";

export default function CustomToastContainer() {
  const { toasts } = useContext(ToastContext);
  return (
    <ToastContainer
      position="bottom-end"
      className="p-3 position-fixed end-0 bottom-0"
    >
      {toasts.map((toast, idx) => (
        <CustomToast
          key={idx}
          title={toast.title}
          message={toast.message}
          variant={toast.variant}
        />
      ))}
    </ToastContainer>
  );
}
