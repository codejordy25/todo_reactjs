import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  title: string;
  priority: Priority;
};

function App() {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Moyenne");

  // Charger les todos depuis le localStorage au démarrage
  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");

  //il verifie si il ya saveTodos et le passe a InitialTodos
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  //Mette à jour la liste des todos dans le localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    if (input.trim() === "") {
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      title: input.trim(),
      priority: priority,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    // setTodos([...todos, newTodo]);
    setInput("");
    setPriority("Moyenne");
  }

  let filteredTodos: Todo[] = [];

  if (filter === "Tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }

  const urgentCount = todos.filter((t) => t.priority === "Urgente").length;
  const mediumCount = todos.filter((t) => t.priority === "Moyenne").length;
  const lowCount = todos.filter((t) => t.priority === "Basse").length;
  const totalCount = todos.length;

  return (
    <div className="flex justify-center">
      {" "}
      <div className="w-2/3 flex flex-col gap-4 my-15 p-5 bg-base-300 rounded-2xl">
        <div className="flex gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajouter une tache"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            className="select w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            title="Sélectionnez la priorité"
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button className="btn btn-primary" onClick={handleAddTodo}>
            Ajouter
          </button>
        </div>
        <div className="space-y-2 flex-1 h-fit">
          <div className="flex flex-wrap gap-4">
            <button
              className={`btn btn-soft ${
                filter === "Tous" ? "btn-primary" : ""
              }`}
              //On ne peux pas faire passer une fonction set dans onClick
              onClick={() => setFilter("Tous")}
            >
              Tous({totalCount})
            </button>

            <button
              className={`btn btn-soft ${
                filter === "Urgente" ? "btn-primary" : ""
              }`}
              //On ne peux pas faire passer une fonction set dans onClick
              onClick={() => setFilter("Urgente")}
            >
              Urgente({urgentCount})
            </button>

            <button
              className={`btn btn-soft ${
                filter === "Moyenne" ? "btn-primary" : ""
              }`}
              //On ne peux pas faire passer une fonction set dans onClick
              onClick={() => setFilter("Moyenne")}
            >
              Moyenne({mediumCount})
            </button>

            <button
              className={`btn btn-soft ${
                filter === "Basse" ? "btn-primary" : ""
              }`}
              //On ne peux pas faire passer une fonction set dans onClick
              onClick={() => setFilter("Basse")}
            >
              Basse({lowCount})
            </button>
          </div>
          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem todo={todo} />
                </li>
              ))}
            </ul>
          ) : (
            <div>Aucune tâche à afficher</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
