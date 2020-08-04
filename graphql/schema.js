const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    startQuiz(name: String): QuizResponse
  }

  type Mutation {
    postQuiz(questions: [questionsInput!]): Response
    submitQuiz(quizInput: submitQuizInput!): [Result]
  }

  type Question {
    question: String
    options: [String]
  }

  type Response {
    success: Boolean
    message: String
  }

  input submitQuizInput {
    name: String!
    answers: [Int!]
  }

  input questionsInput {
    question: String!
    options: [String!]
    answer: Int!
  }

  interface QuizResponse {
    quizTaken: Boolean
  }

  type QuestionResponse implements QuizResponse {
    quizTaken: Boolean
    questions: [Question]
  }

  type ScoreResponse implements QuizResponse {
    quizTaken: Boolean
    scores: [Result]
  }

  type Result {
    name: String
    score: Int
  }
`;
