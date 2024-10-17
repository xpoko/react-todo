import "./App.css";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { useFilterStore, useListStore } from "./store";

const App = () => {
  console.log("rerender");
  const { filterValue } = useFilterStore();
  const { todoList, handleInput } = useListStore();
  const displayTodoList = todoList.length > 0;

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
      {displayTodoList && <Main filterValue={filterValue}></Main>}
      {displayTodoList && <Footer filterValue={filterValue}></Footer>}
    </div>
  );
};

export default App;
