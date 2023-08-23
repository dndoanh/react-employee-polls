import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addUserAnswer, addUserQuestion } from "./users";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

const addAnswerQuestion = (userId, questionId, answer) => {
  return {
    type: ADD_ANSWER_QUESTION,
    userId,
    questionId,
    answer,
  };
};

const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

const handleAddQuestion = (firstOption, secondOption) => {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    const question = {
      optionOneText: firstOption,
      optionTwoText: secondOption,
      author: authedUser,
    };
    const savedQuestion = await saveQuestion(question);
    dispatch(addQuestion(savedQuestion));
    dispatch(addUserQuestion(savedQuestion));
  };
};

const handleAddAnswer = (questionId, answer) => {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    const answerObject = {
      authedUser: authedUser.id,
      questionId: questionId,
      answer,
    };
    const isAdded = await saveQuestionAnswer(answerObject);
    if (isAdded) {
      dispatch(addAnswerQuestion(authedUser.id, questionId, answer));
      dispatch(addUserAnswer(authedUser.id, questionId, answer));
    }
  };
};

export { handleAddQuestion, handleAddAnswer, receiveQuestions };
