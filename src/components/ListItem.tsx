import { useEffect, useRef, useState } from "react";
import { FILTER_VALUE } from "../constant";
import { TodoItemType } from "../models/model";
import { useListStore } from "../store";

export interface ListItemProps {
  item: TodoItemType;
}

const ListItem = ({ item }: ListItemProps) => {
  const { handleInput, toggleItemState, removeItem } = useListStore();
  const [itemIsInputState, setItemIsInputState] = useState(false);

  const inputCheckboxRef = useRef<HTMLInputElement>(null);
  const inputTextRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: any) => {
    const isSubmit = handleInput(event, item);

    if (isSubmit) {
      setItemIsInputState(false);
    }
  };

  const handleDoubleClickItem = () => {
    setItemIsInputState(true);
  };

  useEffect(() => {
    const inputText = inputTextRef.current;
    const inputCheckbox = inputCheckboxRef.current;
    if (itemIsInputState && inputText) {
      inputText.focus();
      inputText.setSelectionRange(
        inputText.value.length,
        inputText.value.length
      );
    } else {
      inputCheckbox?.blur();
    }
  }, [itemIsInputState]);

  return (
    <li
      className={item.state === FILTER_VALUE.COMPLETED ? "completed" : ""}
      onDoubleClickCapture={handleDoubleClickItem}
    >
      {!itemIsInputState ? (
        <div className="view">
          <input
            ref={inputCheckboxRef}
            onClick={() => toggleItemState(item)}
            className="toggle"
            type="checkbox"
          />
          <label data-testid="todo-item-label">{item.name}</label>
          <button className="destroy" onClick={() => removeItem(item)} />
        </div>
      ) : (
        <div className="input-container">
          <input
            ref={inputTextRef}
            className="new-todo"
            id="todo-input"
            type="text"
            defaultValue={item.name}
            onBlur={() => setItemIsInputState(false)}
            onKeyDown={handleKeyDown}
          />
          <label className="visually-hidden" htmlFor="todo-input">
            {item.name}
          </label>
        </div>
      )}
    </li>
  );
};

export default ListItem;
