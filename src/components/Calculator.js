import { useCalculator } from '../context/CalculatorContext';
import { ACTIONS } from "../calculatorLogic";

import Display from "./Display";
import Button from "./Button";

export default function Calculator() {
  const buttonsList = [
    { label: "C", className: "action-btn" },
    { label: "CE", className: "action-btn" },
    { label: "%", className: "operator-btn" },
    { label: "/", className: "operator-btn" },

    { label: "7", className: "digit-btn" },
    { label: "8", className: "digit-btn" },
    { label: "9", className: "digit-btn" },
    { label: "*", className: "operator-btn" },

    { label: "4", className: "digit-btn" },
    { label: "5", className: "digit-btn" },
    { label: "6", className: "digit-btn" },
    { label: "-", className: "operator-btn" },

    { label: "1", className: "digit-btn" },
    { label: "2", className: "digit-btn" },
    { label: "3", className: "digit-btn" },
    { label: "+", className: "operator-btn" },

    { label: "0", className: "digit-btn zero-btn" },
    { label: ".", className: "digit-btn" },
    { label: "=", className: "equals-btn" },
  ];

  const { state, dispatch } = useCalculator();

  function handleButtonClick(buttonConfig) {
    if (buttonConfig.className.includes("digit-btn")) {
      dispatch({
        type: ACTIONS.ADD_DIGIT,
        payload: { digit: buttonConfig.label },
      });
      return;
    }

    if (buttonConfig.className.includes("operator-btn")) {
      dispatch({
        type: ACTIONS.CHOOSE_OPERATION,
        payload: { operation: buttonConfig.label },
      });
      return;
    }

    if (buttonConfig.label === "C") {
      dispatch({ type: ACTIONS.CLEAR });
      return;
    }

    if (buttonConfig.label === "=") {
      dispatch({ type: ACTIONS.EVALUATE });
      return;
    }
  }

  return (
    <div className="calculator">
      <Display value={state.currentOperand} />
      <div className="buttons">
        {buttonsList.map((list) => (
          <Button
            key={list.label}
            label={list.label}
            className={list.className}
            onClick={() => handleButtonClick(list)}
          />
        ))}
      </div>
    </div>
  );
}
