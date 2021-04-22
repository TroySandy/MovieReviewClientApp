import { useContext } from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext from "../../contexts/UserContext";

const SiteNavbar = (props) => {
  let userContext = useContext(UserContext);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand className="mr-auto">Movie DB</Navbar.Brand>
        </LinkContainer>
        <Nav>
          {userContext.token !== "" ? (
            <Nav.Link
              onClick={() => {
                userContext.setToken("");
              }}
            >
              Log Out
            </Nav.Link>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar>
      {userContext.token}
    </>
  );
};

export default SiteNavbar;
