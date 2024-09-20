import { useState } from "react";
import { Toast } from "react-bootstrap";

export default function CustomToast({ title, message, variant }) {
  const [show, setShow] = useState(true);
  return (
    <Toast
      bg={variant?.toLowerCase() || "secondary"}
      onClose={() => setShow(false)}
      show={show}
      delay={4000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
