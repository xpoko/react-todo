import { FILTER_VALUE } from "../constant";
import { useFilterStore, useListStore } from "../store";
import ListItem from "./ListItem";


const Main = () => {
  console.log("rerender main");
  const { todoList, toggleAllItemState } = useListStore();
  const { filterValue } = useFilterStore();

  const displayList = todoList.filter(
    (item) => filterValue === FILTER_VALUE.ALL || item.state === filterValue
  );

  return todoList.length > 0 ? (
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
  ): null;
};

export default Main;
