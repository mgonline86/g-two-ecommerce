import { useContext, useMemo } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import AppContext from "../contexts/AppContext";
import CartRow from "./CartRow";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ToastContext from "../contexts/ToastContext";

export default function CartDrawer() {
  const { showCart, handleCloseCart, cart, currency, setCart, isLogged } =
    useContext(AppContext);
  const { setToasts } = useContext(ToastContext);
  const lineItems = useMemo(() => Object.values(cart), [cart]);
  const total = useMemo(
    () => lineItems.reduce((a, b) => a + b.qty * b.product.price, 0),
    [lineItems]
  );

  const handleCheckout = () => {
    setCart({});
    handleCloseCart();
    setToasts((prev) => [
      ...prev,
      {
        variant: "success",
        title: "Success",
        message: "Checkout successfully!",
      },
    ]);
  };

  return (
    <>
      <Offcanvas
        show={showCart}
        onHide={handleCloseCart}
        placement="end"
        className="w-100"
        style={{ maxWidth: "500px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!lineItems.length ? (
            <div className="text-center">
              <h5>Your cart is empty</h5>
              <Button
                className="w-100"
                variant="primary"
                as={Link}
                to="/"
                onClick={handleCloseCart}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item) => (
                    <CartRow key={item.timestamp} lineItem={item} hidePrice />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="text-end">
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
                <ButtonGroup vertical>
                  <Button
                    className="w-100"
                    variant="primary"
                    as={Link}
                    to="/cart"
                    onClick={handleCloseCart}
                  >
                    Go to Cart Page
                  </Button>
                  {isLogged ? (
                    <Button
                      className="w-100"
                      variant="success"
                      disabled={!lineItems.length}
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
                </ButtonGroup>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
