const { _saveQuestionAnswer, _saveQuestion } = require("./_DATA");


describe('_saveQuestion', () => {
    test('should save the question and populated fields correctly', async () => {
        const question = {
            optionOneText: 'Apple only',
            optionTwoText: 'Banana and pineapple',
            author: { id: 'sarahedo' }
        };

        const savedQuestion = await _saveQuestion(question);

        expect(savedQuestion).toEqual({
            id: expect.any(String),
            timestamp: expect.any(Number),
            author: 'sarahedo',
            optionOne: {
                votes: [],
                text: 'Apple only'
            },
            optionTwo: {
                votes: [],
                text: 'Banana and pineapple'
            }
        });
    });

    test('should reject if the input for optionOneText, optionTwoText, and author are missing', async () => {
        const question = {};
        await expect(_saveQuestion(question)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
    });
});

describe("_saveQuestionAnswer", () => {
    test("should return true for correct parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionTwo"
        });

        expect(response).toBeTruthy();
    });

    test("should return error for incorrect parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: undefined,
            qid: undefined,
            answer: "optionTwo"
        }).catch(e => e);

        expect(response).toBe("Please provide authedUser, qid, and answer");
    });
});
