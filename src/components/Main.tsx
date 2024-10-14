import { FILTER_VALUE } from "../constant";
import { TodoItemType } from "../models/model";

export interface MainProps {
  todoList: TodoItemType[];
  filterValue: string;
  removeItem: (item: TodoItemType) => void;
  toggleItemState: (item: TodoItemType) => void;
  toggleAllItemState: () => void;
}

const Main = ({
  todoList,
  filterValue,
  removeItem,
  toggleItemState,
  toggleAllItemState,
}: MainProps) => {
  const displayList = todoList.filter(
    (item) => filterValue === FILTER_VALUE.ALL || item.state === filterValue
  );
  return (
    <main className="main" data-testid="main">
      <div className="toggle-all-container">
        <input
          className="toggle-all"
          type="checkbox"
          data-testid="toggle-all"
          onClick={toggleAllItemState}
        />
        <label className="toggle-all-label" htmlFor="toggle-all">
          Toggle All Input
        </label>
      </div>
      <ul className="todo-list" data-testid="todo-list">
        {displayList.map((item, index) => (
          <li
            key={`${item}_${index}`}
            className={item.state === FILTER_VALUE.COMPLETED ? "completed" : ""}
            data-testid="todo-item"
          >
            <div className="view">
              <input
                onClick={() => toggleItemState(item)}
                className="toggle"
                type="checkbox"
                data-testid="todo-item-toggle"
              />
              <label data-testid="todo-item-label">{item.name}</label>
              <button
                className="destroy"
                onClick={() => removeItem(item)}
                data-testid="todo-item-button"
              />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
