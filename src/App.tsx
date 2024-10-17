import { useShallow } from "zustand/react/shallow";
import "./App.css";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { useListStore } from "./store";

const App = () => {
  console.log("rerender");
  const handleInput = useListStore(useShallow((state) => state.handleInput));

  return (
    <div className="App">
      <header className="header" data-testid="header">
        <h1>todos</h1>
        <div className="input-container">
          <input
            className="new-todo"
            id="todo-input"
            type="text"
            placeholder="What needs to be done?"
            defaultValue=""
            onKeyDown={handleInput}
          />
          <label className="visually-hidden" htmlFor="todo-input">
            New Todo Input
          </label>
        </div>
      </header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
};

export default App;
