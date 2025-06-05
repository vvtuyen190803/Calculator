import "./button.css";

const ButtonItem = ({ btn, onButtonClick, firstNum, lastNum, isResult }) => {
  let className = "number";
  if (["+", "-", "*", "/", "="].includes(btn)) className = "operator";
  if (["AC", "+/-", "%"].includes(btn)) className = "function";
  if (btn === "0") className += " zero";

  let displayText = btn;
  if (displayText === "AC") {
    if (isResult || (!firstNum && !lastNum)) {
      displayText = "AC";
    } else {
      displayText = "C";
    }
  }

  const handeleClick = () => {
    if (btn === "AC") {
      if (isResult || (!firstNum && !lastNum)) {
        onButtonClick("AC");
      } else {
        onButtonClick("C");
      }
    } else {
      onButtonClick(btn);
    }
  };

  return (
    <button className={className} onClick={handeleClick}>
      {displayText}
    </button>
  );
};

export default ButtonItem;
