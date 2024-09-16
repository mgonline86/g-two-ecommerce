import Container from "react-bootstrap/Container";
import { useContext, useMemo } from "react";
import { Table } from "react-bootstrap";

import CartRow from "../components/CartRow";
import { AppContext } from "../context";

function CartPage() {
  const { cart, currency } = useContext(AppContext);
  const lineItems = useMemo(() => Object.values(cart), [cart]);
  const total = useMemo(
    () => lineItems.reduce((a, b) => a + b.qty * b.product.price, 0),
    [lineItems]
  );
  if (!lineItems.length)
    return <h1 className="my-5 text-center">Your Cart is empty!</h1>;
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
              <h5>{total} {currency}</h5>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default CartPage;
