import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";
import { Button, Card, Container, Form } from "react-bootstrap";

const NewPollPage = ({ dispatch }) => {
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    firstOption: "",
    secondOption: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (options.firstOption === "" || options.secondOption === "") {
      alert("Please input for both options");
      return;
    }
    dispatch(handleAddQuestion(options.firstOption, options.secondOption));
    navigate("/");
  };
  return (
    <>
      <Container>
      <h1 className="text-center">New Poll</h1>
        <Card className="text-center">
          <Card.Header>Would You Rather</Card.Header>
          <Card.Title>Create Your Own Poll</Card.Title>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Option</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Option One"
                  value={options.firstOption}
                  onChange={(e) =>
                    setOptions({ ...options, firstOption: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Second Option</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Option Two"
                  value={options.secondOption}
                  onChange={(e) =>
                    setOptions({ ...options, secondOption: e.target.value })
                  }
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default connect()(NewPollPage);
