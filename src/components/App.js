import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { receiveInitialData } from "../actions/initialData";
import Nav from "./Nav";
import PrivateWrapper from "./PrivateWrapper";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import LeaderBoardPage from "../pages/LeaderBoardPage";
import LoginPage from "../pages/LoginPage";
import NewPollPage from "../pages/NewPollPage";
import PollPage from "../pages/PollPage";

const App = ({ dispatch }) => {
  useEffect(() => {
    dispatch(receiveInitialData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className=" container mx-auto">
      <Nav />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderBoardPage />} />
          <Route path="/add" element={<NewPollPage />} />
          <Route path="/questions/:id" element={<PollPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default connect()(App);
