import { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "../calculatorLogic";

const CalculatorContext = createContext();

export function useCalculator() {
  return useContext(CalculatorContext);
}

export function CalculatorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}
