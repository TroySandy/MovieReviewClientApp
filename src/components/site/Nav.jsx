import { useContext } from "react";
import { Nav, Navbar, NavLink, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext from "../../contexts/UserContext";
import '../site/Site.css'
import Image from '../assests/memepopcorn.png'

const SiteNavbar = (props) => {
  let userContext = useContext(UserContext);

  return (
    <>
      <Navbar className="sticky-top" bg="danger" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand className="mr-auto" id="title">
            PrintView
            <img src={Image} 
            width="80"
            height="60"/></Navbar.Brand>
          
        </LinkContainer>
        <Nav>
          <LinkContainer to="/">
            <Nav.Link id="home">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/watched">
            <Nav.Link>Watchlist</Nav.Link>
          </LinkContainer>
          {userContext.isAuth ? (
            <>
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
