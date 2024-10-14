import { useState } from "react";
import { TodoItem, TodoItemType } from "./models/model";
import "./App.css";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { FILTER_VALUE } from "./constant";

const App = () => {
  console.log("rerender");
  const initialTodoList: TodoItemType[] =
    localStorage
      .getItem("todoList")
      ?.split("|")
      .map((item) => JSON.parse(item)) || [];
  const [todoList, setTodoList] = useState<TodoItemType[]>(initialTodoList);
  const [filterValue, setFilterValue] = useState(FILTER_VALUE.ALL);

  const updateTodoList = (newTodoList: TodoItemType[]) => {
    setTodoList(newTodoList);

    if (newTodoList.length > 0) {
      localStorage.setItem(
        "todoList",
        newTodoList.map((item) => JSON.stringify(item)).join("|")
      );
    } else {
      localStorage.removeItem("todoList");
    }
  };

  const input = (event: any) => {
    const key = event.code;

    if (key === "Enter") {
      const item = TodoItem(event.target.value.trim(), FILTER_VALUE.ACTIVE);

      if (item) {
        updateTodoList([...todoList, item]);
        event.target.value = "";
      }
    }
  };

  const toggleAllItemState = () => {
    let newTodoList;
    if (
      todoList.filter((item) => item.state === FILTER_VALUE.ACTIVE).length > 0
    ) {
      newTodoList = todoList.map(
        (newItem) => (newItem = { ...newItem, state: FILTER_VALUE.COMPLETED })
      );
    } else {
      newTodoList = todoList.map(
        (newItem) => (newItem = { ...newItem, state: FILTER_VALUE.ACTIVE })
      );
    }

    updateTodoList(newTodoList);
  };

  const toggleItemState = (item: TodoItemType) => {
    const itemIndex = todoList.indexOf(item);

    if (item.state === FILTER_VALUE.ACTIVE) {
      todoList[itemIndex].state = FILTER_VALUE.COMPLETED;
    } else {
      todoList[itemIndex].state = FILTER_VALUE.ACTIVE;
    }
    updateTodoList([...todoList]);
  };

  const removeItem = (item: TodoItemType) => {
    updateTodoList(todoList.filter((newItemList) => newItemList !== item));
  };

  const handleFilter = (event: any) => {
    if (filterValue === event.target.innerHTML) {
      return;
    }
    setFilterValue(event.target.innerHTML);
  };

  const handleClearComplete = () => {
    const updatedList = todoList.filter(
      (item) => item.state !== FILTER_VALUE.COMPLETED
    );

    if (updatedList.length !== todoList.length) {
      updateTodoList(updatedList);
    }
  };

  return (
    <div className="App">
      <header className="header" data-testid="header">
        <h1>todos</h1>
        <div className="input-container">
          <input
            className="new-todo"
            id="todo-input"
            type="text"
            data-testid="text-input"
            placeholder="What needs to be done?"
            defaultValue=""
            onKeyDown={input}
          />
          <label className="visually-hidden" htmlFor="todo-input">
            New Todo Input
          </label>
        </div>
      </header>
      {todoList.length > 0 && (
        <Main
          filterValue={filterValue}
          todoList={todoList}
          removeItem={removeItem}
          toggleItemState={toggleItemState}
          toggleAllItemState={toggleAllItemState}
        ></Main>
      )}
      {todoList.length > 0 && (
        <Footer
          handleFilter={handleFilter}
          handleClearComplete={handleClearComplete}
          remainingListLength={
            todoList.filter((item) => item.state === FILTER_VALUE.ACTIVE).length
          }
          filterValue={filterValue}
        ></Footer>
      )}
    </div>
  );
};

export default App;
