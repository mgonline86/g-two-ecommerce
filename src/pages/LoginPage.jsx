import { useContext } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import AppContext from "../contexts/AppContext";
import { Navigate } from "react-router-dom";
import { updateLocalStorage } from "../lib/helpers";
import ToastContext from "../contexts/ToastContext";

export default function LoginPage() {
  const { setUser, isLogged, setIsLogged } = useContext(AppContext);
  const { setToasts } = useContext(ToastContext);

  if (isLogged) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    // const password = formData.get("password");
    const rememberMe = formData.get("rememberMe");
    const user = { email, name: "Guest" };
    if (rememberMe) {
      updateLocalStorage("user", user);
    } else {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
    setToasts((prev) => [
      ...prev,
      {
        variant: "info",
        title: "Success",
        message: `Welcome ${user.name}!`,
      },
    ]);
    setUser(user);
    setIsLogged(true);
  };

  return (
    <main className="container vh-100 d-flex align-items-center">
      <Form
        className="w-100 m-auto"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <h1 className="h1 mb-3 fw-normal text-center fw-bold">Login</h1>

        <FloatingLabel controlId="floatingInput" label="Email address">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            className="rounded-0 rounded-top"
            name="email"
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            className="rounded-0 rounded-bottom"
            name="password"
            required
          />
        </FloatingLabel>
        <Form.Check
          className="text-start my-3"
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          label="Remember me"
        />
        <Button variant="primary" className="w-100 py-2" type="submit">
          Sign in
        </Button>
      </Form>
    </main>
  );
}
