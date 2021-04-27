import { useContext } from "react";
import { Nav, Navbar, NavLink, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext from "../../contexts/UserContext";
import '../site/Site.css'

const SiteNavbar = (props) => {
  let userContext = useContext(UserContext);

  return (
    <>
      <Navbar bg="danger" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand className="mr-auto">Movie DB</Navbar.Brand>
        </LinkContainer>
        <Nav>
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          {userContext.isAuth ? (
            <>
              <Nav.Link>Watchlist</Nav.Link>
              <Nav.Link
                onClick={() => {
                  userContext.setToken("");
                }}
              >
                Log Out
              </Nav.Link>
            </>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar>
      <Card bg="danger" className="mb-3">
      <Card.Title className="fonts" id="header">
      {userContext.isAuth ? <p>Hello {userContext.user.firstName}!</p> : null}
      </Card.Title>
      </Card>
    </>
  );
};

export default SiteNavbar;
