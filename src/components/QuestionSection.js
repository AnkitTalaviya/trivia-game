import React from "react";

const QuestionSection = ({ questionStats, currentQuestion }) => {
  return (
    <div className="question-section">
      <div className="question-count">
        <span>Question {questionStats.currentQue + 1}</span>/
        {questionStats.totalQues}
      </div>
      <div
        className="question-text"
        dangerouslySetInnerHTML={{
          __html: currentQuestion?.question,
        }}
      />
      <div className="meta-info">
        <p>
          <b>Category:</b>{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: currentQuestion?.category,
            }}
          />
        </p>
        <p>
          <b>Difficulty:</b>{" "}
          <span className={currentQuestion?.difficulty}>
            {currentQuestion?.difficulty}
          </span>
        </p>
      </div>
    </div>
  );
};

export default QuestionSection;
