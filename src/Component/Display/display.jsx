import "./display.css";

const Display = ({ input, result, firstNum, lastNum, isResult, prevCal }) => {
  return (
    <div className="display">
      <div className="math">
        {isResult ? prevCal && <div className="prev">{prevCal}</div> : ""}
      </div>
      <div>{isResult || (!firstNum && !lastNum) ? result : input}</div>
    </div>
  );
};

export default Display;
