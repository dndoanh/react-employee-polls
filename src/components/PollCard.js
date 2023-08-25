import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PollCard = ({ poll, author }) => {
  return (
    <Card style={{ width: "18rem" }} className="text-center">
      <Card.Body>
        <Card.Title>{author?.name}</Card.Title>
        <Card.Text>{new Date(poll.timestamp).toLocaleString()}</Card.Text>
        <Card.Link as={Link} to={`/questions/${poll.id}`}>Show Details</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default PollCard;
