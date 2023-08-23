import { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { handleLoginAuthedUser } from "../actions/authedUser";
import { Alert, Button, Container, Form } from "react-bootstrap";

const LoginPage = ({ dispatch, authedUser, users }) => {
  const [login, setLogin] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState("");
  
  if (authedUser) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    console.log(redirectUrl);
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = dispatch(handleLoginAuthedUser(login));
    if (!res) {
      setError("Invalid username or password");
    }
  };

  const handleSelectLogin = () => {
    if (selectedUser !== "") {
      const user = users.find((u) => u.id === selectedUser);
      dispatch(
        handleLoginAuthedUser({ username: user.id, password: user.password })
      );
    }
  };

  return (
    <Container>
      <h3>Existing Users</h3>
      <Form.Group className="mb-3">
        <Form.Select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option>Select user to login</option>
          {users.length > 0 &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleSelectLogin}>
        Login with selected user
      </Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = ({ authUser, users }) => ({
  authedUser: !!authUser,
  users: Object.keys(users).map((key) => users[key]),
});

export default connect(mapStateToProps)(LoginPage);
