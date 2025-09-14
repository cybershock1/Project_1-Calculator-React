import "./App.css";
import Calculator from "./components/Calculator";
import { CalculatorProvider } from "./context/CalculatorContext";
import History from "./components/History";

function App() {
  return (
    <CalculatorProvider>
      <div className="App">
        <div className="main-content">
          <Calculator />
          <History />
        </div>
      </div>
    </CalculatorProvider>
  );
}

export default App;
