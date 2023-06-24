import logo from "./logo.svg";
import "./App.css";
import { Refubrishment } from "./Refubrishment";
//todo:
// сменить схему  - добавить кнопку
// цена в опциях сразу за всё количество
// конструктор - скинуть ссылку на весь стейт
function App() {
  return (
    <div className="App">
      <Refubrishment />
    </div>
  );
}

export default App;
