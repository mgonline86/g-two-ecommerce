import { useContext } from "react";
import Container from "react-bootstrap/Container";
import { Button, Col, Row } from "react-bootstrap";

import AppContext from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function WishListPage() {
  const { wishList } = useContext(AppContext);

  if (Object.keys(wishList).length === 0) {
    return (
      <div className="container my-5 text-center">
        <h1 className="mb-3">Wishlist is empty!</h1>
        <Button className="fw-bold" variant="primary" as={Link} to="/">
          &larr; Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Row xs={1} md={2} lg={3} className="g-4">
        {Object.values(wishList).map((item, idx) => (
          <Col key={idx}>
            <ProductCard product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default WishListPage;
