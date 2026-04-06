import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // 一覧取得
  const fetchTodos = async () => {
    const res = await fetch("http://127.0.0.1:8000/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 追加
  const addTodo = async () => {
    if (!task) return;

    await fetch("http://127.0.0.1:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: task }),
    });

    setTask("");
    fetchTodos();
  };

  // 削除
  const deleteTodo = async (index) => {
    await fetch(`http://127.0.0.1:8000/todos/${index}`, {
      method: "DELETE",
    });

    fetchTodos();
  };

  return (
    <div>
      <h1>TODOアプリ</h1>

      {/* 入力フォーム */}
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo}>追加</button>

      {/* タスク一覧 */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.text}
            <button onClick={() => deleteTodo(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;