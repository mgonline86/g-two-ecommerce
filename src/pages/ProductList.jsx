import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProductCard from "../components/ProductCard";
import { products } from "./products";

function ProductList() {
  return (
    <Container className="my-5">
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map((item, idx) => (
          <Col key={item.id}>
            <ProductCard product={item} order={idx} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
