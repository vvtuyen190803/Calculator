import "./calculator.css";
import Display from "../Display/display";
import Button from "../Buttons/button";
import { useCallback, useEffect, useState } from "react";
import Decimal from "decimal.js";

const Calculator = () => {
  const [firstNum, setFirstNum] = useState("");
  const [lastNum, setLastNum] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("0");
  const [isResult, setIsResult] = useState(false);
  const [prevCal, setPrevCal] = useState("");

  const handleResult = useCallback(() => {
    if (!firstNum) return;
    if (!operator || !lastNum) {
      setResult(firstNum);
      setIsResult(true);
      return;
    }

    let resultNum;
    const num1 = new Decimal(firstNum);
    const num2 = new Decimal(lastNum);
    switch (operator) {
      case "+":
        resultNum = num1.plus(num2);
        break;
      case "-":
        resultNum = num1.minus(num2);
        break;
      case "*":
        resultNum = num1.times(num2);
        break;
      case "/":
        if (num2.isZero()) {
          setResult("Error");
          setIsResult(true);
          return;
        }
        resultNum = num1.div(num2);
        break;
      default:
        return;
    }

    if (isResult) {
      setPrevCal(`${firstNum}${operator}${lastNum}`);
      setFirstNum(result);
    } else {
      setPrevCal(`${firstNum}${operator}${lastNum}`);
      setFirstNum(resultNum.toString());
    }
    setResult(resultNum.toString());
    setFirstNum(resultNum.toString());
    setIsResult(true);
  }, [firstNum, lastNum, operator, isResult, result]);

  const handlePresent = useCallback(() => {
    if (isResult) {
      const newResult = new Decimal(firstNum).div(100).toString();
      setFirstNum(newResult);
      setLastNum("");
      setOperator("");
      setPrevCal("");
      setIsResult(false);
      return;
    }
    if (!operator && firstNum) {
      const newFirstNum = new Decimal(firstNum).div(100).toString();
      setFirstNum(newFirstNum);
      setIsResult(false);
      return;
    } else if (firstNum && operator && lastNum) {
      const newLastnum = new Decimal(lastNum).div(100).toString();
      setLastNum(newLastnum);
      return;
    }
  }, [firstNum, lastNum, operator, isResult]);

  const handleInput = useCallback(
    (value) => {
      if (!isNaN(value) || value === ".") {
        if (value === ".") {
          if (!operator && firstNum.includes(".")) return;
          if (operator && lastNum.includes(".")) return;
          if (!operator && !firstNum) {
            setFirstNum("0.");
            return;
          } else if (operator && !lastNum) {
            setLastNum("0.");
            return;
          } else if (isResult) {
            setFirstNum((prev) => (prev.includes(".") ? prev : prev + value));
            setIsResult(false);
            setLastNum("");
            setOperator("");
            return;
          }
        }

        if (isResult) {
          setFirstNum(value);
          setOperator("");
          setLastNum("");
          setIsResult(false);
          return;
        }
        if (!operator) {
          setFirstNum((prev) => {
            if (value === ".") {
              return prev + value;
            } else {
              return prev === "0" ? value : prev + value;
            }
          });
        } else if (operator) {
          setLastNum((prev) => {
            if (value === ".") {
              return prev + value;
            } else {
              return prev === "0" ? value : prev + value;
            }
          });
        }
      } else if (["+", "-", "*", "/", "%"].includes(value)) {
        if (value === "%") {
          handlePresent();
          return;
        }
        if (result === "Error") {
          return;
        }
        if (isResult) {
          setFirstNum(result);
          setOperator(value);
          setIsResult(false);
          setLastNum("");
          return;
        }
        if (!firstNum) {
          setFirstNum("0");
          setOperator(value);
        } else if (firstNum && lastNum) {
          handleResult();
          setOperator(value);
          setIsResult(false);
          setLastNum("");
          return;
        } else {
          setOperator(value);
        }
      }
    },
    [firstNum, lastNum, operator, isResult, handleResult, handlePresent, result]
  );

  const handleAllClear = useCallback(() => {
    setFirstNum("");
    setLastNum("");
    setOperator("");
    setResult("0");
    setIsResult(false);
    setPrevCal("");
  }, []);

  const handleClear = useCallback(() => {
    if (lastNum) {
      setLastNum((prev) => prev.slice(0, -1));
    } else if (operator) {
      setOperator("");
    } else {
      setFirstNum((prev) => prev.slice(0, -1));
    }
  }, [lastNum, operator]);

  const handleToggle = useCallback(() => {
    setFirstNum((prev) => (prev.startsWith("-") ? prev.slice(1) : `-${prev}`));
  }, []);

  const handeleClick = (value) => {
    if (value === "=") {
      handleResult();
    } else if (value === "AC" || value === "C") {
      if (isResult || (!firstNum && !lastNum)) {
        handleAllClear();
      } else {
        handleClear();
      }
    } else if (value === "+/-") {
      handleToggle();
    } else {
      handleInput(value);
    }
  };

  const handleKeyPress = useCallback(
    (event) => {
      const key = event.key;
      if (
        !isNaN(key) ||
        key === "." ||
        ["+", "-", "*", "/", "%"].includes(key)
      ) {
        handleInput(key);
      } else if (key === "=" || key === "Enter") {
        handleResult();
      } else if (key === "c") {
        if (isResult || (!firstNum && !lastNum)) {
          handleAllClear();
        } else {
          handleClear();
        }
      }
    },
    [
      firstNum,
      lastNum,
      isResult,
      handleAllClear,
      handleClear,
      handleInput,
      handleResult,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="calculator">
      <Display
        input={firstNum + operator + lastNum}
        result={result}
        firstNum={firstNum}
        lastNum={lastNum}
        isResult={isResult}
        prevCal={prevCal}
      />
      <Button
        onButtonClick={handeleClick}
        firstNum={firstNum}
        lastNum={lastNum}
        isResult={isResult}
      />
    </div>
  );
};

export default Calculator;
