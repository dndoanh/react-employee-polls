import { useState } from "react";
import { connect } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Figure,
  Row,
} from "react-bootstrap";

const Poll = ({ dispatch, authedUser, users, questions }) => {
  const { id } = useParams();
  const author = users[questions[id]?.author]?.name;
  const authedUserAnswer = users[authedUser?.id]?.answers[id];
  const [answer, setAnswer] = useState(authedUserAnswer);
  const initialVoteCount = {
    optionOne: questions[id]?.optionOne?.votes?.length,
    optionTwo: questions[id]?.optionTwo?.votes?.length,
  };
  const [voteCount, setVoteCount] = useState(initialVoteCount);

  if (!questions[id]) {
    return <Navigate to="/notfound" />;
  }
  console.log(questions[id].optionOne.votes.includes(authedUser?.id));
  const handleSelectOption = (option) => {
    if (answer) return;
    dispatch(handleAddAnswer(id, option));
    setAnswer(option);
    if (option === "optionOne") {
      setVoteCount((prev) => ({ ...prev, optionOne: prev.optionOne + 1 }));
    } else {
      setVoteCount((prev) => ({ ...prev, optionTwo: prev.optionTwo + 1 }));
    }
  };
  return (
    <Container className="text-center">
      <h1 className="text-center text-2xl font-extrabold">Poll by {author}</h1>
      {users[questions[id].author].avatarURL && (
        <Figure>
          <Figure.Image
            rounded
            width={180}
            height={180}
            src={users[questions[id].author].avatarURL}
          />
        </Figure>
      )}
      <h2 className="text-center text-2xl font-extrabold">Would you rather</h2>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card style={{ width: "24rem" }} className="text-center">
            <Card.Body>
              <Card.Title>{questions[id].optionOne.text}</Card.Title>
              <Alert variant="info">
                There are {voteCount.optionOne} votes as{" "}
                {(
                  (voteCount.optionOne /
                    (voteCount.optionOne + voteCount.optionTwo)) *
                  100
                ).toFixed(2)}{" "}
                % of people voted this option
              </Alert>
              {questions[id].optionOne.votes.includes(authedUser?.id) && (
                <Alert variant="success">You voted this option</Alert>
              )}
              {!answer && (
                <Card.Link
                  as={Button}
                  onClick={() => handleSelectOption("optionOne")}
                >
                  Click to vote
                </Card.Link>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex justify-content-center">
          <Card style={{ width: "24rem" }} className="text-center">
            <Card.Body>
              <Card.Title>{questions[id].optionTwo.text}</Card.Title>
              <Alert variant="info">
                There are {voteCount.optionTwo} votes as{" "}
                {(
                  (voteCount.optionTwo /
                    (voteCount.optionOne + voteCount.optionTwo)) *
                  100
                ).toFixed(2)}{" "}
                % of people voted this option
              </Alert>
              {questions[id].optionTwo.votes.includes(authedUser?.id) && (
                <Alert variant="success">You voted this option</Alert>
              )}
              {!answer && (
                <Card.Link
                  as={Button}
                  onClick={() => handleSelectOption("optionTwo")}
                >
                  Click to vote
                </Card.Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => ({
  authedUser,
  users,
  questions,
});

export default connect(mapStateToProps)(Poll);
