import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/Pig.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MyNavbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="secondary" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            <img
              src={logo}
              alt="Chat APP Logo"
              style={{ height: "2.5rem", marginRight: "0.5rem" }}
            />
            Pig Chat APP
          </Link>
        </h2>
        {user && <span className="text-warning">Logged in as Aspan</span>}
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
                <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  className="link-light text-decoration-none"
                >
                  Log out
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Sign up
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
