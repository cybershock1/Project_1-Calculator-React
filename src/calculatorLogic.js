export const initialState = {
  currentOperand: "0",
  previousOperand: null,
  operation: null,
  overwrite: false,
  history: [],
};

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";

  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      return "";
  }
  return computation.toString();
}

export function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite === true) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      if (state.currentOperand === "0" && payload.digit !== ".") {
        return { ...state, currentOperand: payload.digit };
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === "0" && state.previousOperand === null) {
        return state;
      }
      if (state.currentOperand === "0") {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand === null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: "0",
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: "0",
      };

    case ACTIONS.CLEAR:
      return initialState;

    case ACTIONS.EVALUATE:
      const result = evaluate(state);
      const historyEntry = `${state.previousOperand} ${state.operation} ${state.currentOperand} = ${result}`;

      if (
        state.operation == null ||
        state.previousOperand == null ||
        state.currentOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: result,
        history: [historyEntry, ...state.history].slice(0, 5),
      };

    default:
      return state;
  }
}
