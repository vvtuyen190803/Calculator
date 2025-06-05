import "./button.css";
import ButtonItem from "./button_items";

const buttons = [
  ["AC", "+/-", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const Button = ({ onButtonClick, firstNum, lastNum, isResult }) => {
  return (
    <div className="button-container">
      {buttons.map((row, rowIndex) => (
        <div className="button-row" key={rowIndex}>
          {row.map((btn) => (
            <ButtonItem
              btn={btn}
              key={btn}
              onButtonClick={onButtonClick}
              firstNum={firstNum}
              lastNum={lastNum}
              isResult={isResult}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Button;
