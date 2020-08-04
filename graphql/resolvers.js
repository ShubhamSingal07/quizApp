const Quiz = require('../models/quiz');
const User = require('../models/user');

module.exports = {
  Query: {
    startQuiz: async (parent, { name }) => {
      const res = await User.findOne({ name }).lean();
      if (name === 'author' || (res && res._id))
        return {
          quizTaken: true,
          name,
        };

      return {
        quizTaken: false,
      };
    },
  },

  Mutation: {
    postQuiz: async (parent, { questions }) => {
      try {
        await Quiz.insertMany(questions);
        return {
          success: true,
          message: 'successfully posted',
        };
      } catch (err) {
        return {
          success: false,
          message: 'Something went wrong',
        };
      }
    },

    submitQuiz: async (parent, { quizInput: { answers, name } }) => {
      const questions = await Quiz.find({}).select('answer').lean();
      let score = 0;
      questions.forEach((question, index) => {
        answers.length > index && question.answer === answers[index] && score++;
      });

      await User.create({ name, answers, score });
      return [{ name, score }];
    },
  },

  QuizResponse: {
    __resolveType(obj) {
      if (obj.quizTaken) return 'ScoreResponse';
      return 'QuestionResponse';
    },
  },

  QuestionResponse: {
    questions: () => Quiz.find({}).lean(),
  },

  ScoreResponse: {
    scores: ({ name }) => {
      if (name === 'author') return User.find({}).select('name score').lean();
      return [User.findOne({ name }).select('name score').lean()];
    },
  },
};
