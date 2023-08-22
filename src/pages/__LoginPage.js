import { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { handleUserLogin } from "../actions/authActions";
import { Button, Container, Form } from "react-bootstrap";

const LoginPage = (props) => {
  const { isAuthed, users, dispatch } = props;
  const [currentUser, setCurrentUser] = useState({});

  const [error, setError] = useState("");
  if (isAuthed) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    console.log(redirectUrl);
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = dispatch(handleUserLogin(currentUser));
    if (!res) {
      setError("Invalid username or password");
    }
  };

  const handleLogin = (username, password) => {
    dispatch(handleUserLogin({ username, password }));
  };

  return (
    <Container>
      <h3>Existing Users</h3>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Select>
          <option>Select user to login</option>
          {users.length > 0 &&
              users.map((person) => <option>{person.name}</option>)}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login with selected user
      </Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={currentUser.username}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={currentUser.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser: authedUser,
  users: users,
});

export default connect(mapStateToProps)(LoginPage);
