import { create } from "zustand";
import { TodoItem, TodoItemType } from "../models/model";
import { FILTER_VALUE } from "../constant";

interface TodoListState {
  todoList: TodoItemType[];
  handleInput: (event: any, item?: TodoItemType) => boolean;
  handleClearComplete: () => void;
  toggleAllItemState: () => void;
  toggleItemState: (item: TodoItemType) => void;
  removeItem: (item: TodoItemType) => void;
}
interface FilterValueState {
  filterValue: string;
  setFilterValue: (value: string) => void;
  handleFilter: (event: any) => void;
}

const initialTodoList: TodoItemType[] =
  localStorage
    .getItem("todoList")
    ?.split("|")
    .map((item) => JSON.parse(item)) || [];

const updateLocalStorage = (newTodoList: TodoItemType[]) => {
  if (newTodoList.length > 0) {
    localStorage.setItem(
      "todoList",
      newTodoList.map((item) => JSON.stringify(item)).join("|")
    );
  } else {
    localStorage.removeItem("todoList");
  }
};

export const useFilterStore = create<FilterValueState>((set) => ({
  filterValue: FILTER_VALUE.ALL,
  setFilterValue: (value: string) => {
    set(() => ({ filterValue: value }));
  },
  handleFilter: (event: any) => {
    set((state) => {
      if (state.filterValue === event.target.innerHTML) {
        return state;
      }
      return { filterValue: event.target.innerHTML };
    });
  },
}));

export const useListStore = create<TodoListState>((set) => ({
  todoList: initialTodoList,
  handleInput: (event: any, updatingItem?: TodoItemType) => {
    const key = event.code;

    if (key === "Enter") {
      const newName = event.target.value.trim();

      if (!newName || updatingItem?.name === newName) {
        return true;
      }

      if (updatingItem) {
        set((state) => {
          const newTodoList = state.todoList.map((item) =>
            updatingItem === item ? { ...item, name: newName } : item
          );
          updateLocalStorage(newTodoList);
          return { todoList: newTodoList };
        });
      } else {
        const item = TodoItem(newName, FILTER_VALUE.ACTIVE);
        set((state) => {
          const newTodoList = [...state.todoList, item];
          updateLocalStorage(newTodoList);
          return { todoList: newTodoList };
        });
      }

      event.target.value = "";
      return true;
    }
    return false;
  },
  toggleAllItemState: () => {
    let newTodoList;
    set((state) => {
      if (
        state.todoList.filter((item) => item.state === FILTER_VALUE.ACTIVE)
          .length > 0
      ) {
        newTodoList = state.todoList.map(
          (newItem) => (newItem = { ...newItem, state: FILTER_VALUE.COMPLETED })
        );
      } else {
        newTodoList = state.todoList.map(
          (newItem) => (newItem = { ...newItem, state: FILTER_VALUE.ACTIVE })
        );
      }

      updateLocalStorage(newTodoList);
      return { todoList: newTodoList };
    });
  },
  toggleItemState: (item: TodoItemType) => {
    set((state) => {
      const itemIndex = state.todoList.indexOf(item);

      if (item.state === FILTER_VALUE.ACTIVE) {
        state.todoList[itemIndex].state = FILTER_VALUE.COMPLETED;
      } else {
        state.todoList[itemIndex].state = FILTER_VALUE.ACTIVE;
      }
      const newTodoList = [...state.todoList];
      updateLocalStorage(newTodoList);
      return { todoList: newTodoList };
    });
  },
  removeItem: (item: TodoItemType) => {
    set((state) => {
      const newTodoList = state.todoList.filter(
        (newItemList) => newItemList !== item
      );
      updateLocalStorage(newTodoList);
      return { todoList: newTodoList };
    });
  },
  handleClearComplete: () => {
    set((state) => {
      const newTodoList = state.todoList.filter(
        (item) => item.state !== FILTER_VALUE.COMPLETED
      );

      if (newTodoList.length !== state.todoList.length) {
        updateLocalStorage(newTodoList);
        return { todoList: newTodoList };
      } else {
        return state;
      }
    });
  },
}));
