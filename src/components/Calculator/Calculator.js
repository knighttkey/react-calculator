import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./Calculator.scss";

const Calculator = () => {
  const [inputCount, setInputCount] = useState(0);
  const [inputCountArray, setInputCountArray] = useState([]);
  const [inputResultShow, setInputResultShow] = useState(false);
  const [bracketsDisable, setBracketsDisable] = useState(false);

  const handleClear = () => {
    setInputCount(0);
    setInputCountArray([]);
    setInputResultShow(false);
    setBracketsDisable(false);
  };
  const handleClickButton = (buttonContent) => {
    setInputResultShow(false);
    let tempCountArray = [...inputCountArray];
    tempCountArray.push(buttonContent);
    console.log("tempCountArray", tempCountArray);
    setInputCountArray(tempCountArray);
  };

  const handleSum = () => {
    setInputCountArray([inputCount]);
    setInputResultShow(true);
  };

  useEffect(() => {
    if (inputCountArray.length) {
      var stringModified = inputCountArray.join("");
      let finalString;
      if (
        typeof Number(stringModified[stringModified.length - 1]) === "number" &&
        !isNaN(Number(stringModified[stringModified.length - 1]))
      ) {
        console.log("無運算符");
        finalString = stringModified;
        if(stringModified.includes("(") || stringModified.includes(")")) {
          
        } else {
          console.log("括號無效")
          setBracketsDisable(true);
        }
        
      } else if (
        isNaN(Number(stringModified[stringModified.length - 1])) &&
        (stringModified[stringModified.length - 1] === "+" ||
          stringModified[stringModified.length - 1] === "-" ||
          stringModified[stringModified.length - 1] === "*" ||
          stringModified[stringModified.length - 1] === "/")
      ) {
        console.log("非數字運算符，去除");
        finalString = stringModified.substr(0, stringModified.length - 1);
        setBracketsDisable(false);
      } else if (
        isNaN(Number(stringModified[stringModified.length - 1])) &&
        (stringModified[stringModified.length - 1] === "(" ||
          stringModified[stringModified.length - 1] === ")")
      ) {
        console.log("括號");
        finalString = stringModified;
        setBracketsDisable(false);
      }
      console.log("stringModified", stringModified);
      console.log("finalString", finalString);
      let tempString;
      try {
        tempString = eval(finalString);
      } catch (err) {
        tempString = finalString;
      }
      console.log("tempString", tempString);
      setInputCount(Number(tempString));
    } else {
      setInputCount(0)
    }
  }, [inputCountArray]);

  const handleBackspace = () => {
    if(inputCountArray.length === 1) {
      let tempString = inputCountArray[0].toString();
      console.log('tempString', tempString)
      let tempRemainder = tempString.substr(0, tempString.length - 1);
      console.log('tempRemainder', tempRemainder)
      // let = tempArray = [];
      setInputCountArray([Number(tempRemainder)])
    } else {
      let temp = [...inputCountArray];
      temp.pop()
      console.log('temp', temp)
      setInputCountArray(temp);
    }
  }
  

  return (
    <div className="App">
      <div className="calc_container">
        <div className="input_area">
          <div className={`calc_area ${inputResultShow ? "hide" : ""}`}>
            {inputCountArray.map((item, key) => {
              return item;
            })}
          </div>
          <div className={`input_tag ${inputResultShow ? "result_show" : ""}`}>
            {inputCount ? inputCount : null}
          </div>
        </div>
        <div className="btn_area">
          <div className="number_btn_area">
            <div className="row">
              <div className="number_btn" onClick={handleClear}>
                AC
              </div>
              <div
              className={`number_btn ${bracketsDisable ? "disable" : ""}`}
              onClick={() => handleClickButton("(")}
            >
              (
            </div>
            <div
              className={`number_btn ${bracketsDisable ? "disable" : ""}`}
              onClick={() => handleClickButton(")")}
            >
              )
            </div>
            </div>
            <div className="row">
              <div
                className="number_btn"
                onClick={() => handleClickButton(1)}
                disabled="disabled"
              >
                1
              </div>
              <div className="number_btn" onClick={() => handleClickButton(2)}>
                2
              </div>
              <div className="number_btn" onClick={() => handleClickButton(3)}>
                3
              </div>
            </div>

            <div className="row">
              <div className="number_btn" onClick={() => handleClickButton(4)}>
                4
              </div>
              <div className="number_btn" onClick={() => handleClickButton(5)}>
                5
              </div>
              <div className="number_btn" onClick={() => handleClickButton(6)}>
                6
              </div>
            </div>

            <div className="row">
              <div className="number_btn" onClick={() => handleClickButton(7)}>
                7
              </div>
              <div className="number_btn" onClick={() => handleClickButton(8)}>
                8
              </div>
              <div className="number_btn" onClick={() => handleClickButton(9)}>
                9
              </div>
            </div>

            <div className="row">
            <div className="number_btn" onClick={() => handleClickButton(".")}>
              .
            </div>
              <div className="number_btn" onClick={() => handleClickButton(0)}>
                0
              </div>
              <div className="number_btn btn_equals" onClick={handleSum}></div>
            </div>
          </div>
          <div className="func_btn_area">
            <div
              className="btn btn_backspace"
              onClick={handleBackspace}
            ></div>
            <div
              className="btn btn_addition"
              onClick={() => handleClickButton("+")}
            ></div>
            <div
              className="btn btn_subtraction"
              onClick={() => handleClickButton("-")}
            ></div>
            <div
              className="btn btn_multiplication"
              onClick={() => handleClickButton("*")}
            ></div>
            <div
              className="btn btn_division"
              onClick={() => handleClickButton("/")}
            ></div>
          </div>
        </div>
      </div>
      {/* <img src={backspace}></img> */}
    </div>
  );
};

export default Calculator;
