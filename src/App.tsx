import { useState } from "react";

type Priority = "Urgente" | "Moyenne" | "Forte";

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

  //il verifie si il ya saveTodos et le passe a InitialTodos
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

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
      </div>
    </div>
  );
}

export default App;
