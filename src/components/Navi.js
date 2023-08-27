import { connect } from "react-redux";
import { handleLogoutAuthedUser } from "../actions/authedUser";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navi = ({ dispatch, authedUser }) => {
  const location = useLocation();
  if (location.pathname === "/notfound") {
    return null;
  }
  const handleLogout = () => {
    dispatch(handleLogoutAuthedUser());
  };
  const navLinks = [
    { path: "/", title: "Home", testid: "home-link" },
    { path: "/leaderboard", title: "Leaderboard", testid: "leaderboard-link" },
    { path: "/add", title: "New Poll", testid: "new-poll-link" },
  ];

  return (
    <>
      {authedUser && (
        <Navbar>
          <Container>
            <Link to={"/"} className="navbar-brand">
              Employee Poll
            </Link>
            <Nav className="me-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link"
                  data-testid={link.testid}
                >
                  {link.title}
                </Link>
              ))}
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: {authedUser?.name}
                <Button
                  onClick={handleLogout}
                  variant="link"
                  data-testid="logout-link"
                >
                  Logout
                </Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(Navi);
