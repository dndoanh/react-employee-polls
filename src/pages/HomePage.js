import { useState } from "react";
import { connect } from "react-redux";
import PollCard from "../components/PollCard";
import { Card, Col, Container, Row } from "react-bootstrap";

const HomePage = ({ answeredQuestions, unansweredQuestions, users }) => {
  const [showPoll, setShowPoll] = useState(0);
  return (
    <Container>
      <h1 className="text-center">Dashboard</h1>
      <Card>
        <Card.Header>New Questions</Card.Header>
        <Card.Body>
          <Row xs={1} md={2} lg={3} className="g-4">
            {unansweredQuestions.map((poll, idx) => {
              return (
                <Col key={idx}>
                  <PollCard
                    key={poll.id}
                    poll={poll}
                    author={users[poll.author]}
                  />
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
      <br />
      <Card>
        <Card.Header>Done</Card.Header>
        <Card.Body>
          <Row xs={1} md={2} lg={3} className="g-4">
            {answeredQuestions.map((poll, idx) => {
              return (
                <Col key={idx}>
                  <PollCard
                    key={poll.id}
                    poll={poll}
                    author={users[poll.author]}
                  />
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
  const answeredQuestions = Object.values(questions)
    .filter((poll) => {
      return (
        poll.optionOne.votes.includes(authedUser.id) ||
        poll.optionTwo.votes.includes(authedUser.id)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp);
  const unansweredQuestions = Object.values(questions)
    .filter((poll) => {
      return (
        !poll.optionOne.votes.includes(authedUser.id) &&
        !poll.optionTwo.votes.includes(authedUser.id)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    answeredQuestions,
    unansweredQuestions,
    users,
  };
};

export default connect(mapStateToProps)(HomePage);
