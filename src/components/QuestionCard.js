import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsList } from "../redux/action/questionsList/getQuestionsList";
import { isValidArray, randomizeArray } from "../modules/utils";
import LoadingSpinner from "./LoadingSpinner";
import QuestionSection from "./QuestionSection";
import AnswerSection from "./AnswerSection";
import ResultSection from "./ResultSection";
import CustomMessage from "./CustomMessage";
import ScoreSection from "./ScoreSection";
import { createStructuredSelector } from "reselect";

const QuestionCard = () => {
  const dispatch = useDispatch();

  const selectors = createStructuredSelector({
    questions: (state) => state.questionsList.data?.results,
    isQuestionsLoading: (state) => state.questionsList.loading,
  });

  const { questions, isQuestionsLoading } = useSelector(selectors);

  const DEFAULT_QUESTIONS_STATE = {
    currentQue: 0,
    incorrectQues: 0,
    totalQues: 0,
    userAnswers: [],
    correctAnswer: null,
    options: [],
    showResult: false,
    answerSelected: false,
    difficulty: { easy: 0, medium: 0, hard: 0 },
  };
  
  const MAX_QUESTIONS = 10;

  const [isSubmit, setIsSubmit] = useState(false);
  const [questionStats, setQuestionStats] = useState(DEFAULT_QUESTIONS_STATE);

  const fetchQuestionsAndInitialize = () => {
    dispatch(fetchQuestionsList(MAX_QUESTIONS))
      .then((res) => {
        const results = res?.data.results;
        const currentQuestion = results[0];
        const options = randomizeArray([
          ...currentQuestion?.incorrect_answers,
          currentQuestion?.correct_answer,
        ]);

        setQuestionStats((prev) => ({
          ...prev,
          totalQues: results.length,
          options: options,
          correctAnswer: currentQuestion?.correct_answer,
          showResult: false,
          answerSelected: false,
          userAnswers: Array(results.length).fill(null),
          currentQue: 0,
          incorrectQues: 0,
          difficulty: { easy: 0, medium: 0, hard: 0 },
        }));
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const fetchAPI = () => fetchQuestionsAndInitialize();
    return () => fetchAPI();
    // eslint-disable-next-line
  }, [dispatch]);

  const handleAnswerClick = (selectedAnswer) => {
    setQuestionStats((prev) => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [prev.currentQue]: selectedAnswer,
      },
      correctAnswer: questions?.[prev.currentQue]?.correct_answer,
      showResult: true,
      answerSelected: true,
    }));
  };

  const onNextBTN = () => {
    setIsSubmit(false);
    setQuestionStats((prev) => {
      const nextQue = prev.currentQue + 1;
      if (nextQue <= prev.totalQues) {
        const currentQuestion = questions?.[nextQue];
        const options =
          nextQue < prev.totalQues
            ? randomizeArray([
                ...currentQuestion?.incorrect_answers,
                currentQuestion?.correct_answer,
              ])
            : [];

        return {
          ...prev,
          currentQue: nextQue,
          options: options,
          incorrectQues:
            prev.userAnswers[prev.currentQue] === prev.correctAnswer
              ? prev.incorrectQues
              : prev.incorrectQues + 1,
          correctAnswer: null,
          showResult: false,
          answerSelected: false,
          difficulty:
            prev.userAnswers[prev.currentQue] === prev.correctAnswer
              ? {
                  ...prev.difficulty,
                  [questions?.[prev.currentQue]?.difficulty]:
                    prev.difficulty[questions?.[prev.currentQue]?.difficulty] +
                    1,
                }
              : { ...prev.difficulty },
        };
      } else {
        return DEFAULT_QUESTIONS_STATE;
      }
    });
  };

  const onPlayAgain = () => fetchQuestionsAndInitialize();

  const getTotalQuestionDifficulty = (diff) => {
    return questions.filter((que) => que.difficulty === diff).length;
  };

  const onTryAgain = () => fetchQuestionsAndInitialize();

  if (isQuestionsLoading) {
    return <LoadingSpinner />;
  }
  if (!isValidArray(questions)) {
    return <CustomMessage onTryAgain={onTryAgain} />;
  }

  return (
    <div className="app">
      {!!questionStats.totalQues &&
        (questionStats.currentQue < questionStats.totalQues ? (
          <>
            <QuestionSection
              questionStats={questionStats}
              currentQuestion={questions?.[questionStats.currentQue]}
            />
            <AnswerSection
              questionStats={questionStats}
              handleAnswerClick={handleAnswerClick}
              isSubmit={isSubmit}
            />
            {questionStats.showResult && (
              <ResultSection
                questionStats={questionStats}
                isSubmit={isSubmit}
                onNextBTN={onNextBTN}
                setIsSubmit={setIsSubmit}
              />
            )}
          </>
        ) : (
          <ScoreSection
            questionStats={questionStats}
            onPlayAgain={onPlayAgain}
            getTotalQuestionDifficulty={getTotalQuestionDifficulty}
          />
        ))}
    </div>
  );
};

export default QuestionCard;
