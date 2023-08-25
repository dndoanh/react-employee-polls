import { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import NotFoundPage from "./NotFoundPage";
import { Button, Col, Container, Figure, Row } from "react-bootstrap";

const Poll = ({ dispatch, authedUser, users, questions }) => {
  const { id } = useParams();
  const author = users[questions[id]?.author]?.name;
  const authedUserAnswer = users[authedUser?.id]?.answers[id];
  const [answer, setAnswer] = useState(authedUserAnswer);
  console.log(Object.keys(questions).includes(id));
  if (!questions[id]) return <NotFoundPage />;
  const handleSelectOption = (option) => {
    dispatch(handleAddAnswer(id, option));
    setAnswer(option);
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
        <Col>
          <span>{questions[id].optionOne.text}</span> <br />
          <Button
            onClick={() => handleSelectOption("optionOne")}
            variant={`${answer === "optionOne" ? "success" : "secondary"}`}
          >
            Click
          </Button>
        </Col>
        <Col>
          <span>{questions[id].optionTwo.text}</span>
          <br />
          <Button
            onClick={() => handleSelectOption("optionTwo")}
            variant={`${answer === "optionTwo" ? "success" : "secondary"}`}
          >
            Click
          </Button>
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
