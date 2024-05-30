type Question = string;
type Answer = {
  answer: string;
  score: number;
  isCorrect?: boolean;
};

type QuestionAnswer = {
  [key: number]: {
    question: string;
    answers: Answer[]
  }
};