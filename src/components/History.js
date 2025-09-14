// src/components/History.js
import { useCalculator } from "../context/CalculatorContext";

export default function History() {
  const { state } = useCalculator();

  return (
    <div className="history">
      <h4>История:</h4>
      {state.history.length === 0 ? (
        <p>Пока ничего нет</p>
      ) : (
        <ul>
          {state.history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
