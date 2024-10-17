import { useShallow } from "zustand/shallow";
import { FILTER_VALUE } from "../constant";
import { useFilterStore, useListStore } from "../store";

const Footer = () => {
  console.log("rerender footer");

  const { todoList, getRemainingItemLength, handleClearComplete } =
    useListStore(
      useShallow((state) => ({
        todoList: state.todoList,
        getRemainingItemLength: state.getRemainingItemLength,
        handleClearComplete: state.handleClearComplete,
      }))
    );

  const { filterValue, handleFilter } = useFilterStore();

  return todoList.length > 0 ? (
    <footer className="footer">
      <span className="todo-count">{getRemainingItemLength()} items left!</span>
      <ul className="filters">
        <li>
          <a
            className={filterValue === FILTER_VALUE.ALL ? "selected" : ""}
            href="#/"
            onClick={handleFilter}
          >
            {FILTER_VALUE.ALL}
          </a>
        </li>
        <li>
          <a
            className={filterValue === FILTER_VALUE.ACTIVE ? "selected" : ""}
            href="#/active"
            onClick={handleFilter}
          >
            {FILTER_VALUE.ACTIVE}
          </a>
        </li>
        <li>
          <a
            className={filterValue === FILTER_VALUE.COMPLETED ? "selected" : ""}
            href="#/completed"
            onClick={handleFilter}
          >
            {FILTER_VALUE.COMPLETED}
          </a>
        </li>
      </ul>
      <button className="clear-completed" onClick={handleClearComplete}>
        Clear completed
      </button>
    </footer>
  ) : null;
};

export default Footer;
