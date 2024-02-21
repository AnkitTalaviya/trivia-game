import React from "react";

const ResultSection = ({ questionStats, isSubmit, onNextBTN, setIsSubmit }) => {
  return (
    <>
      {questionStats.correctAnswer !==
        questionStats.userAnswers[questionStats.currentQue] &&
        isSubmit && (
          <div className="explanation">
            <p>
              Explanation:
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sit amet blandit ipsum, id scelerisque augue. Aliquam erat
              volutpat. Fusce dolor felis, pellentesque sit amet ligula id,
              fermentum aliquam eros. Aenean ornare eget nunc a tristique.
            </p>
          </div>
        )}
      <div className="footer">
        <button
          className="next-btn"
          onClick={() => (isSubmit ? onNextBTN() : setIsSubmit(true))}
        >
          {isSubmit ? "Next" : "Submit"}
        </button>
      </div>
    </>
  );
};

export default ResultSection;
