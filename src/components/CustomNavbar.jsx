import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useContext, useMemo } from "react";
import { AppContext } from "../context";
import { deleteLocalStorage, deleteSessionStorage } from "../lib/helpers";

function CustomNavbar() {
  const location = useLocation();
  const { cart, wishList, isLogged, user, setIsLogged, setUser } =
    useContext(AppContext);

  const cartCount = useMemo(() => {
    const sum = Object.values(cart).reduce((a, b) => a + b.qty, 0);
    return sum > 99 ? "99+" : sum;
  }, [cart]);

  const wishListCount = useMemo(() => Object.keys(wishList).length, [wishList]);

  if (location.pathname === "/login") return null;

  const handleLogout = () => {
    setIsLogged(false);
    setUser(null);
    deleteLocalStorage("user");
    deleteSessionStorage("user");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Ecommerce
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="wishlist">
            Wishlist <Badge bg="danger">{wishListCount}</Badge>
          </Nav.Link>
          <Nav.Link as={Link} to="cart">
            Cart{" "}
            <Badge bg="warning" text="dark">
              {cartCount}
            </Badge>
          </Nav.Link>
        </Nav>
        {isLogged ? (
          <>
            <div className="text-white">Welcome {user.name}</div>
            <Nav>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </>
        ) : (
          <Nav>
            <Nav.Link as={Link} to="login">
              Login
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
