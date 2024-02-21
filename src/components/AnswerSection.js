import React from "react";

const AnswerSection = ({ questionStats, handleAnswerClick, isSubmit }) => {
  return (
    <div className="answer-section">
      {questionStats.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(option)}
          className={
            isSubmit
              ? questionStats.showResult &&
                option === questionStats.correctAnswer
                ? "correct"
                : questionStats.showResult &&
                  option !== questionStats.correctAnswer &&
                  option === questionStats.userAnswers[questionStats.currentQue]
                ? "incorrect"
                : ""
              : option === questionStats.userAnswers[questionStats.currentQue]
              ? "selected"
              : ""
          }
          disabled={isSubmit}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: option,
            }}
          />
        </button>
      ))}
    </div>
  );
};

export default AnswerSection;
