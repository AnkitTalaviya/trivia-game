import React from "react";

const ScoreSection = ({ questionStats, onPlayAgain, getTotalQuestionDifficulty }) => {
  
  return (
    <div className="score-section">
      <div className="score-heading">Quiz Results</div>
      <div className="score-item">
        Questions Served: {questionStats.totalQues}
      </div>
      <div className="score-item">
        Correct Answers: {questionStats.totalQues - questionStats.incorrectQues}
      </div>
      <div className="score-item">
        Incorrect Answers: {questionStats.incorrectQues}
      </div>
      <hr />
      As per difficulty
      {["easy", "medium", "hard"].map((diff) => (
        <div key={diff} className="score-item">
          {diff}: {questionStats.difficulty[diff]}/
          {getTotalQuestionDifficulty(diff)}
        </div>
      ))}
      <button className="next-btn" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default ScoreSection;
