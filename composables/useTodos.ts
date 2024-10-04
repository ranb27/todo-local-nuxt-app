import { ref, onMounted } from "vue";
import type { Todo } from "~/types/todo";

export const useTodos = () => {
  const todos = ref<Todo[]>([]);

  const loadTodos = (): void => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos);
    }
  };

  const saveTodos = (): void => {
    localStorage.setItem("todos", JSON.stringify(todos.value));
  };

  const addTodo = (text: string): void => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    todos.value.push(newTodo);
    saveTodos();
  };

  const removeTodo = (id: string): void => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
    saveTodos();
  };

  const toggleTodo = (id: string): void => {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      saveTodos();
    }
  };

  onMounted(() => {
    loadTodos();
  });

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
  };
};
