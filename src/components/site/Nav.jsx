import { useContext } from "react";
import { Nav, Navbar, NavLink, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext from "../../contexts/UserContext";
import "../site/Site.css";
import Image from "../assests/image.png";

const SiteNavbar = (props) => {
  let userContext = useContext(UserContext);

  return (
    <>
      <Navbar bg="danger" variant="dark">
        <img src={Image} width="32" height="32" />
        <LinkContainer to="/">
          <Navbar.Brand className="mr-auto" id="title">
            PrintView
          </Navbar.Brand>
        </LinkContainer>
        <Nav>
          <LinkContainer to="/">
            <Nav.Link id="home">Home</Nav.Link>
          </LinkContainer>
          {userContext.isAuth ? (
            <>
              <LinkContainer to="/watched">
                <Nav.Link>Watchlist</Nav.Link>
              </LinkContainer>
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
    </>
  );
};

export default SiteNavbar;
