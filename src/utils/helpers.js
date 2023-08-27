export function sortUsersByActivity(users) {
  const usersArray = Object.values(users);

  return usersArray.sort((a, b) => {
    const userAScore = Object.keys(a.answers).length + a.questions.length;
    const userBScore = Object.keys(b.answers).length + b.questions.length;
    return userBScore - userAScore;
  });
}
