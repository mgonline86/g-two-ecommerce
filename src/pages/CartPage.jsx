import Container from "react-bootstrap/Container";
import { useContext, useMemo } from "react";
import { Button, Table } from "react-bootstrap";

import CartRow from "../components/CartRow";
import AppContext from "../contexts/AppContext";
import { Link } from "react-router-dom";
import ToastContext from "../contexts/ToastContext";
import AuthContext from "../contexts/AuthContext";

function CartPage() {
  const { cart, currency, setCart } = useContext(AppContext);
  const { setToasts } = useContext(ToastContext);
  const { isLogged } = useContext(AuthContext);
  const lineItems = useMemo(() => Object.values(cart), [cart]);
  const total = useMemo(
    () => lineItems.reduce((a, b) => a + b.qty * b.product.price, 0),
    [lineItems]
  );

  const handleCheckout = () => {
    setCart({});
    setToasts((prev) => [
      ...prev,
      {
        variant: "success",
        title: "Success",
        message: "Checkout successfully!",
      },
    ]);
  };

  if (!lineItems.length)
    return (
      <div className="container my-5 text-center">
        <h1 className="mb-3">Your Cart is empty!</h1>
        <Button className="fw-bold" variant="primary" as={Link} to="/">
          &larr; Continue Shopping
        </Button>
      </div>
    );
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Cart</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item) => (
            <CartRow key={item.timestamp} lineItem={item} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="text-end">
              <h5>Subtotal</h5>
            </td>
            <td>
              <h5>
                {total} {currency}
              </h5>
            </td>
          </tr>
        </tfoot>
      </Table>
      <div className="d-flex justify-content-center">
        {isLogged ? (
          <Button
            className="mx-auto text-uppercase"
            variant="success"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        ) : (
          <Button
            className="mx-auto text-uppercase"
            variant="warning"
            as={Link}
            to="/login"
          >
            Login to checkout
          </Button>
        )}
      </div>
    </Container>
  );
}

export default CartPage;
