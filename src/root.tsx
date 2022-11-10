import { component$, useStore } from "@builder.io/qwik";
import { QwikCity } from "@builder.io/qwik-city";

import "./global.css";

export type TodoModal = {
  id: number;
  done: boolean;
  text: string;
};

interface TodoStore {
  todoList: Array<TodoModal>;
  editedTodo: string;
}

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCity> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  const store = useStore<TodoStore>({
    todoList: [
      {
        id: 12321,
        done: true,
        text: "string",
      },
      {
        id: 1232,
        done: false,
        text: "stringasdf",
      },
    ],
    editedTodo: "",
  });

  return (
    <QwikCity>
      <head></head>
      <body lang="en">
        <div class="root">
          <div class="app-root">
            <div class="todo">
              <div class="header">
                <h1>Todo List</h1>
                <p>
                  You have{" "}
                  <b>{store.todoList.filter((todo) => !todo.done).length}</b> of{" "}
                  <b>{store.todoList.length}</b> todoList remaining
                </p>
              </div>
              <div class="form">
                <input
                  class=""
                  type="text"
                  placeholder="Add todo..."
                  value={store.editedTodo}
                  onChange$={(event) => {
                    const target = event.target as HTMLInputElement;
                    store.editedTodo = target.value;
                  }}
                  onKeyUp$={(event) => {
                    if (event.key === "Enter") {
                      store.todoList = [
                        ...store.todoList,
                        {
                          id: Math.floor(Math.random() * (1000000 - 1 + 1) + 1),
                          done: false,
                          text: store.editedTodo,
                        },
                      ];
                      store.editedTodo = "";
                    }
                  }}
                />
                <button
                  onClick$={() => {
                    store.todoList = [
                      ...store.todoList,
                      {
                        id: Math.floor(Math.random() * (1000000 - 1 + 1) + 1),
                        done: false,
                        text: store.editedTodo,
                      },
                    ];
                    store.editedTodo = "";
                  }}
                >
                  +
                </button>
              </div>
              <div class="body">
                <ul>
                  {store.todoList.map((todo) => {
                    return (
                      <li class="todo-item">
                        <div class="info">
                          <label class="checkbox">
                            <input type="checkbox" />
                            <div
                              onClick$={() => {
                                store.todoList = store.todoList.map((t) => {
                                  if (t.id === todo.id) {
                                    return {
                                      ...t,
                                      done: !t.done,
                                    };
                                  }
                                  return t;
                                });
                              }}
                              class={`el ${todo.done ? "done" : ""}`}
                            ></div>
                          </label>
                          <div class={`text ${todo.done ? "done" : ""}`}>
                            {todo.text}
                          </div>
                        </div>
                        <div class="remove">
                          <button
                            title="Remover item"
                            onClick$={() => {
                              store.todoList = store.todoList.filter(
                                (t) => t.id !== todo.id
                              );
                            }}
                          >
                            <svg
                              height="21"
                              viewBox="0 0 21 21"
                              width="21"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g
                                fill="none"
                                fill-rule="evenodd"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                transform="translate(5 5)"
                              >
                                <path d="m10.5 10.5-10-10z"></path>
                                <path d="m10.5.5-10 10"></path>
                              </g>
                            </svg>
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </body>
    </QwikCity>
  );
});

export async function getTodoList(
  controller?: AbortController
): Promise<string[]> {
  console.log("FETCH", `https://api.github.com/users/${username}/repos`);
  const response = await fetch("http://localhost:3001/todo", {
    signal: controller?.signal,
  });

  console.log("FETCH resolved");
  const todoList = await response.json();
  return todoList;
}
