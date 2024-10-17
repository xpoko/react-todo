import { FILTER_VALUE } from "../constant";
import { useListStore } from "../store";
import ListItem from "./ListItem";

export interface MainProps {
  filterValue: string;
}

const Main = ({ filterValue }: MainProps) => {
  const { todoList, toggleAllItemState } = useListStore();

  const displayList = todoList.filter(
    (item) => filterValue === FILTER_VALUE.ALL || item.state === filterValue
  );
  return (
    <main className="main">
      <div className="toggle-all-container">
        <input
          className="toggle-all"
          type="checkbox"
          onClick={toggleAllItemState}
        />
        <label className="toggle-all-label" htmlFor="toggle-all">
          Toggle All Input
        </label>
      </div>
      <ul className="todo-list" data-testid="todo-list">
        {displayList.map((item, index) => (
          <ListItem key={`${item}_${index}`} item={item}></ListItem>
        ))}
      </ul>
    </main>
  );
};

export default Main;
