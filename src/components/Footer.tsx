import { FILTER_VALUE } from "../constant";

export interface FooterProps {
  remainingListLength: number;
  handleFilter: (event: any) => void;
  handleClearComplete: () => void;
  filterValue: string;
}

const Footer = ({
  remainingListLength,
  handleFilter,
  handleClearComplete,
  filterValue,
}: FooterProps) => {
  return (
    <footer className="footer" data-testid="footer">
      <span className="todo-count">{remainingListLength} items left!</span>
      <ul className="filters" data-testid="footer-navigation">
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
