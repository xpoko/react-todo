export interface TodoItemType {
  name: string;
  state: string;
}

export const TodoItem = function (taskName: string, state: string) {
  return { name: taskName, state: state };
};
