import { FILTER_VALUE } from "../constant";
import { useFilterStore, useListStore } from "../store";

export interface FooterProps {
  filterValue: string;
}

const Footer = ({ filterValue }: FooterProps) => {
  const { todoList, handleClearComplete } = useListStore();

  const remainingListLength = todoList.filter(
    (item) => item.state === FILTER_VALUE.ACTIVE
  ).length;

  const { handleFilter } = useFilterStore();

  return (
    <footer className="footer">
      <span className="todo-count">{remainingListLength} items left!</span>
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
  );
};

export default Footer;
