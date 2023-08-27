import { useState } from "react";
import { connect } from "react-redux";
import { handleLoginAuthedUser } from "../actions/authedUser";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const { dispatch, authedUser, users } = props;
  const [login, setLogin] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = dispatch(handleLoginAuthedUser(login));
    handleRedirect(res);
  };
  const handleSelectLogin = () => {
    if (selectedUser !== "") {
      const user = users.find((u) => u.id === selectedUser);
      const res = dispatch(
        handleLoginAuthedUser({ username: user.id, password: user.password })
      );
      handleRedirect(res);
    }
  };
  const handleRedirect = (res) => {
    if (!res) {
      setError("Invalid username or password");
    } else {
      const from = location.state?.from || "/";
      navigate(from);
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
            data-testid="username-input"
            placeholder="Enter username"
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            data-testid="password-input"
            placeholder="Enter password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>
        {error && (
          <Alert variant="danger" data-testid="error-message">
            {error}
          </Alert>
        )}
        <Button variant="primary" type="submit" data-testid="submit-login">
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
