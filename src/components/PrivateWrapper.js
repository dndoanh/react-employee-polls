import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const PrivateWrapper = ({ loggedIn }) => {
  return <div className=" md:mx-10 mx-4">
    {loggedIn
      ? <Outlet />
      : <LoginPage />
    }
  </div>;
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(PrivateWrapper);
