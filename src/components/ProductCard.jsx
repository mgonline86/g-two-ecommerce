import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AppContext from "../contexts/AppContext";
import styles from "./ProductCard.module.css";

function ProductCard({ product, order }) {
  const { addToCart, wishList, toggleWish, currency, handleShowCart } =
    useContext(AppContext);
  const { name, price, description } = product;
  return (
    <Card
      className={`mx-auto shadow rounded-4 ${styles.productCard}`}
      style={{ maxWidth: "18rem" }}
    >
      <Card.Img
        variant="top"
        className="img-fluid"
        src={product.image}
        alt={name}
        width={600}
        height={400}
        loading={order > 3 ? "lazy" : "eager"}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text className="fs-3 fw-bolder">
          {price} {currency}
        </Card.Text>
        <div className="d-flex align-items-center justify-content-between">
          <Button
            variant="primary"
            onClick={() => {
              addToCart(product);
              handleShowCart();
            }}
            className="d-flex align-items-center gap-2 text-uppercase"
          >
            Add to cart
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
              className="lucide lucide-shopping-cart"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </Button>
          <Button
            variant={wishList[product.id] ? "danger" : "outline-secondary"}
            onClick={() => toggleWish(product)}
          >
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
              className="lucide lucide-heart"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
