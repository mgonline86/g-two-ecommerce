import { useCallback, useContext, useMemo } from "react";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { AppContext } from "../context";

function CartRow({ lineItem }) {
  const { removeFromCart, updateCartQty, currency } = useContext(AppContext);
  const { product, qty } = lineItem;
  const { id, name, price, image } = product;
  const total = useMemo(() => qty * price, [qty, price]);

  const validateQty = useCallback(
    (e, product) => {
      if (e.target.value < 1) {
        updateCartQty(product.id, 1);
      }

      if (e.target.value > 99) {
        updateCartQty(product.id, 99);
      }
    },
    [updateCartQty]
  );

  return (
    <tr className="align-middle">
      <td>
        <Image src={image} thumbnail style={{ width: "100px" }} />
      </td>
      <td>{name}</td>
      <td>{price} {currency}</td>
      <td>
        <InputGroup size="sm">
          <Button
            variant="outline-secondary"
            onClick={() => updateCartQty(product.id, qty - 1)}
            disabled={qty < 2}
          >
            -
          </Button>
          <Form.Control
            type="number"
            value={qty}
            onChange={(e) => updateCartQty(product.id, Number(e.target.value))}
            min={1}
            max={99}
            onBlur={(e) => validateQty(e, product)}
            style={{ textAlign: "center", maxWidth: 60 }}
          />
          <Button
            variant="outline-secondary"
            onClick={() => updateCartQty(product.id, qty + 1)}
            disabled={qty > 98}
          >
            +
          </Button>
        </InputGroup>
      </td>
      <td>{total} {currency}</td>
      <td>
        <Button variant="danger" onClick={() => removeFromCart(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash-2"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </Button>
      </td>
    </tr>
  );
}

export default CartRow;
