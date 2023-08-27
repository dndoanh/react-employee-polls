import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { receiveInitialData } from "./actions/initialData";
import Navi from "./components/Navi";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import NewPollPage from "./pages/NewPollPage";
import PollDetailPage from "./pages/PollDetailPage";
import { Container } from "react-bootstrap";
import { LoadingBar } from "react-redux-loading-bar";
import { useLocation } from "react-router-dom";

const App = ({ dispatch, authedUser }) => {
  const location = useLocation();
  useEffect(() => {
    dispatch(receiveInitialData());
  }, []);
  const loggedIn = !!authedUser;
  return (
    <Fragment>
      <LoadingBar />
      {authedUser && <Navi />}
      <Container>
        <Routes>
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/"
            exact
            element={
              !loggedIn ? (
                <Navigate to="/login" state={{ from: "/" }} />
              ) : (
                <HomePage />
              )
            }
          />
          <Route
            path="/add"
            element={
              !loggedIn ? (
                <Navigate to="/login" state={{ from: "/add" }} />
              ) : (
                <NewPollPage />
              )
            }
          />
          <Route
            path="/leaderboard"
            element={
              !loggedIn ? (
                <Navigate to="/login" state={{ from: "/leaderboard" }} />
              ) : (
                <LeaderboardPage />
              )
            }
          />
          <Route
            path="/questions/:id"
            element={!loggedIn ? <Navigate to="/login" state={{ from: location.pathname }}/> : <PollDetailPage />}
          />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route
            path="*"
            element={
              !loggedIn ? (
                <Navigate to="/login" state={{ from: "/notfound" }} />
              ) : (
                <NotFoundPage />
              )
            }
          />
        </Routes>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  authedUser,
});

export default connect(mapStateToProps)(App);
