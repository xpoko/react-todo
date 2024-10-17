import { create } from "zustand";
import { TodoItemType } from "../models/model";
import { FILTER_VALUE } from "../constant";

interface TodoListState {
  todoList: TodoItemType[];
  todoListLength: number;
  activeListLength: number;
  handleInput: (event: any, item?: TodoItemType) => boolean;
  handleClearComplete: () => void;
  toggleAllItemState: () => void;
  updateListLength: () => void;
  updateActiveListLength: () => void;
  toggleItemState: (item: TodoItemType) => void;
  removeItem: (item: TodoItemType) => void;
  updateTodoList: (newTodoList: TodoItemType[]) => void;
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

export const useListStore = create<TodoListState>((set, get) => ({
  todoList: initialTodoList,
  todoListLength: initialTodoList.length,
  activeListLength: initialTodoList.filter(
    (item) => item.state === FILTER_VALUE.ACTIVE
  ).length,
  updateTodoList: (newTodoList: TodoItemType[]) => {
    set(() => {
      updateLocalStorage(newTodoList);
      return { todoList: newTodoList };
    });
  },
  updateListLength: () => {
    set(() => {
      return { todoListLength: get().todoList.length };
    });
  },
  updateActiveListLength: () => {
    set(() => {
      return {
        activeListLength: get().todoList.filter(
          (item) => item.state === FILTER_VALUE.ACTIVE
        ).length,
      };
    });
  },
  handleInput: (event: any, updatingItem?: TodoItemType) => {
    const key = event.code;

    if (key === "Enter") {
      const newName = event.target.value.trim();

      if (!newName || updatingItem?.name === newName) {
        return true;
      }

      let newTodoList;

      if (updatingItem) {
        newTodoList = get().todoList.map((item) =>
          updatingItem === item ? { ...item, name: newName } : item
        );
      } else {
        newTodoList = [
          ...get().todoList,
          {
            name: newName,
            state: FILTER_VALUE.ACTIVE,
          },
        ];
      }

      get().updateTodoList(newTodoList);

      if (!updatingItem) get().updateListLength();

      event.target.value = "";
      return true;
    }
    return false;
  },
  toggleAllItemState: () => {
    let newTodoList;
    if (
      get().todoList.filter((item) => item.state === FILTER_VALUE.ACTIVE)
        .length > 0
    ) {
      newTodoList = get().todoList.map(
        (newItem) => (newItem = { ...newItem, state: FILTER_VALUE.COMPLETED })
      );
    } else {
      newTodoList = get().todoList.map(
        (newItem) => (newItem = { ...newItem, state: FILTER_VALUE.ACTIVE })
      );
    }

    get().updateTodoList(newTodoList);
    get().updateActiveListLength();
  },
  toggleItemState: (item: TodoItemType) => {
    const itemIndex = get().todoList.indexOf(item);

    if (item.state === FILTER_VALUE.ACTIVE) {
      get().todoList[itemIndex].state = FILTER_VALUE.COMPLETED;
    } else {
      get().todoList[itemIndex].state = FILTER_VALUE.ACTIVE;
    }
    const newTodoList = [...get().todoList];
    get().updateTodoList(newTodoList);
    get().updateActiveListLength();
  },
  removeItem: (item: TodoItemType) => {
    const newTodoList = get().todoList.filter(
      (newItemList) => newItemList !== item
    );
    get().updateTodoList(newTodoList);
    get().updateListLength();
  },
  handleClearComplete: () => {
    const newTodoList = get().todoList.filter(
      (item) => item.state !== FILTER_VALUE.COMPLETED
    );

    if (newTodoList.length !== get().todoList.length) {
      get().updateTodoList(newTodoList);
      get().updateActiveListLength();
      get().updateListLength();
    }
  },
}));
