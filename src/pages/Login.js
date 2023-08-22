import { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { handleLoginAuthedUser } from "../actions/authedUser";
import { Alert, Button, Container, Form } from "react-bootstrap";

const Login = ({ dispatch, authedUser, users }) => {
  const [login, setLogin] = useState({
    username: "tylermcginnis",
    password: "abc321",
  });
  const currentUsers = users;

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

  const handleLogin = (username, password) => {
    dispatch(handleLoginAuthedUser({ username, password }));
  };

  return (
    <Container>
      <ul>
      {currentUsers.length > 0 && currentUsers.map((item) => (
              <li key={item.id}>
                {item.name}
              </li>
            ))}
      </ul>
      <h3>Existing Users</h3>
      <Form.Group className="mb-3">
        <Form.Select>
          <option>Select user to login</option>
          {users.length > 0 &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
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
    // <div className=" flex justify-center flex-col items-center gap-6">
    //   <h1 className=" text-blue-400 text-4xl p-8 text-center">Login</h1>
    //   <div className="dropdown">
    //     <label data-testid="existing-user-label" tabIndex="0" className="btn m-1">Existing User</label>
    //     <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    //       <li onClick={() => {
    //         handleLogin("sarahedo", "password123")
    //       }}><span>Sarah Edo</span></li>
    //       <li onClick={() => {
    //         handleLogin("tylermcginnis", "abc321")
    //       }}><span>Tyler McGinnis</span></li>
    //       <li onClick={() => {
    //         handleLogin("mtsamis", "xyz123")
    //       }}><span>Mike Tsamis</span></li>
    //       <li onClick={() => {
    //         handleLogin("zoshikanlu", "pass246")
    //       }}><span>Zenobia Oshikanlu</span></li>
    //     </ul>
    //   </div>
    //   {/* Login Form with username and password */}
    //   <form onSubmit={handleSubmit} className=" form-control w-full max-w-xs space-y-6">
    //     <div className=" space-y-2">
    //       <label data-testid="username-label" htmlFor="username">Username</label>
    //       <input data-testid="username-input" onChange={
    //         (e) => setCredentials({
    //           ...credentials,
    //           username: e.target.value
    //         })
    //       } value={credentials.username} className="input input-bordered w-full max-w-xs" type="text" id="username" name="username" />
    //     </div>

    //     <div className=" space-y-2">
    //       <label data-testid="password-label" htmlFor="password">Password</label>
    //       <input data-testid="password-input" onChange={
    //         (e) => setCredentials({
    //           ...credentials,
    //           password: e.target.value
    //         })
    //       } value={credentials.password} className="input input-bordered w-full max-w-xs" type="password" id="password" name="password" />
    //     </div>
    //     <button data-testid="submit-login" className="btn">Login</button>
    //   </form>
    //   {error && <div className="alert alert-error shadow-lg max-w-xs">
    //     <div>
    //       <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    //       <span data-testid="error-message">Username or password is incorrect</span>
    //     </div>
    //   </div>}
    // </div>
  );
};

const mapStateToProps = ({ authUser, users }) =>  ({
    authedUser: !!authUser,
    users: users
});

export default connect(mapStateToProps)(Login);
