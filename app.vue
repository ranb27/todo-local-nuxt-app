<template>
  <div class="min-h-screen bg-base-100 transition-colors duration-100">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-primary">Todo App</h1>
        <button @click="toggleTheme" class="btn btn-circle btn-ghost">
          <svg
            v-if="isDarkMode"
            viewBox="0 0 24 24"
            fill="oklch(var(--in))"
            class="w-6 h-6"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M9.822 2.238a9 9 0 0011.94 11.94C20.768 18.654 16.775 22 12 22 6.477 22 2 17.523 2 12c0-4.775 3.346-8.768 7.822-9.762zm8.342.053L19 2.5v1l-.836.209a2 2 0 00-1.455 1.455L16.5 6h-1l-.209-.836a2 2 0 00-1.455-1.455L13 3.5v-1l.836-.209A2 2 0 0015.29.836L15.5 0h1l.209.836a2 2 0 001.455 1.455zm5 5L24 7.5v1l-.836.209a2 2 0 00-1.455 1.455L21.5 11h-1l-.209-.836a2 2 0 00-1.455-1.455L18 8.5v-1l.836-.209a2 2 0 001.455-1.455L20.5 5h1l.209.836a2 2 0 001.455 1.455z"
            />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="oklch(var(--wa))"
            class="w-6 h-6"
          >
            <path
              d="M3.55 19.09l1.41 1.41 1.8-1.79-1.42-1.42M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6c0-3.32-2.69-6-6-6m8 7h3v-2h-3m-2.76 7.71l1.8 1.79 1.41-1.41-1.79-1.8M20.45 5l-1.41-1.4-1.8 1.79 1.42 1.42M13 1h-2v3h2M6.76 5.39L4.96 3.6 3.55 5l1.79 1.81 1.42-1.42M1 13h3v-2H1m12 9h-2v3h2"
            />
          </svg>
        </button>
      </div>

      <div class="card">
        <div class="card-body">
          <form @submit.prevent="addNewTodo" class="flex gap-2 mb-4">
            <input
              v-model="newTodoText"
              type="text"
              placeholder="Add a new todo..."
              class="input input-bordered flex-grow"
              required
            />
            <button
              type="submit"
              class="duration-150 hover:scale-110 active:scale-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="oklch(var(--su))"
                height="2.5em"
                width="2.5em"
              >
                <path
                  d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 001 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm1 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                />
              </svg>
            </button>
          </form>

          <div
            v-if="todos.length === 0"
            class="text-center py-4 text-base-content/70"
          >
            No todos yet. Add one above!
          </div>

          <ul v-else class="space-y-2">
            <li
              v-for="todo in todos"
              :key="todo.id"
              class="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 transition-colors"
            >
              <input
                type="checkbox"
                :checked="todo.completed"
                @change="toggleTodo(todo.id)"
                class="checkbox checkbox-warning"
              />
              <span
                :class="{
                  'flex-grow': true,
                  'line-through text-base-content/70': todo.completed,
                }"
              >
                {{ todo.text }}
              </span>

              <button
                v-if="todo.completed"
                @click="removeTodo(todo.id)"
                class="duration-150 hover:scale-110 active:scale-100"
              >
                <svg
                  viewBox="0 0 576 512"
                  fill="oklch(var(--er))"
                  height="1.5em"
                  width="1.5em"
                >
                  <path
                    d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zm-305 47c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <footer class="absolute bottom-8 w-full">
    <p class="mx-auto text-center opacity-75 text-sm">
      Made with ❤️ by
      <a href="https://github.com/ranb27" target="_blank" class="text-pink-500"
        >Ranb27</a
      >
    </p>
  </footer>
</template>

<script setup lang="ts">
const { todos, addTodo, removeTodo, toggleTodo } = useTodos();
const newTodoText = ref("");

const addNewTodo = () => {
  if (newTodoText.value.trim()) {
    addTodo(newTodoText.value.trim());
    newTodoText.value = "";
  }
};

// Theme switching
const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.setAttribute(
    "data-theme",
    isDarkMode.value ? "dark" : "light"
  );
};

// Initialize theme
onMounted(() => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  isDarkMode.value = prefersDark;
  document.documentElement.setAttribute(
    "data-theme",
    prefersDark ? "dark" : "light"
  );
});
</script>
