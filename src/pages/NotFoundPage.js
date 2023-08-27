import { connect } from "react-redux"
import { Link } from "react-router-dom"
import LoginPage from "./LoginPage"
import { Card } from "react-bootstrap"

const NotFoundPage = ({ loggedIn }) => {
  if (!loggedIn) return (<LoginPage />)
  return (
    <Card>
      <Card.Body>
        <Card.Title>404 ERROR</Card.Title>
        <Card.Text>Oops! You didn't break the Internet. But we didn't find what you're looking for.</Card.Text>
        <Card.Link as={Link} to={"/"}>Go back homepage</Card.Link>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
})

export default connect(mapStateToProps)(NotFoundPage);