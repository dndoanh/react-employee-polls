import { Container, Figure, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { sortUsersByActivity } from "../utils/helpers";

const LeaderBoardPage = ({ users }) => {
  return (
    <Container>
      <h1 className="text-center">Leaderboard</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((usr, idx) => {
            const { name, avatarURL, answers, questions, id } = users[idx];
            return (
              <tr key={idx}>
                <td>
                  <Figure>
                    {avatarURL && (
                      <Figure.Image width={80} height={80} src={avatarURL} />
                    )}
                    <Figure.Caption>{`${name} (${id})`}</Figure.Caption>
                  </Figure>
                </td>
                <td>{Object.keys(answers).length}</td>
                <td>{Object.keys(questions).length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

const mapStateToProps = ({ users }) => ({
  users: sortUsersByActivity(users),
});

export default connect(mapStateToProps)(LeaderBoardPage);
