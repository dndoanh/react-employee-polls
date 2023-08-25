import { connect } from "react-redux";
import { handleLogoutAuthedUser } from "../actions/authedUser";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navi = ({ dispatch, authedUser }) => {
  const handleLogout = () => {
    dispatch(handleLogoutAuthedUser());
  };

  return (
    <>
      {authedUser && (
        <Navbar>
          <Container>
            <Link to={"/"} className="navbar-brand">Employee Poll</Link>
            <Nav className="me-auto">
              <Link to={"/"} className="nav-link">Home</Link>
              <Link to={"/leaderboard"} className="nav-link">Leaderboard</Link>
              <Link to={"/add"} className="nav-link">New Poll</Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: {authedUser?.name}
                <Button onClick={handleLogout} variant="link">
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
