import { Nav, Navbar, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SiteNavbar = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand className="mr-auto">Movie DB</Navbar.Brand>
        </LinkContainer>
        <Nav>
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
    </>
  );
};

export default SiteNavbar;
