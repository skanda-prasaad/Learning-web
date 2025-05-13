import { useState } from "react";

const Display = ({ title, description, done }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <h3>{done ? "Completed" : "Not Completed"}</h3>
    </div>
  );
};

const App = () => {
  const [todo, setTodo] = useState([
    {
      title: "React",
      description: "Library",
      read: false,
    },
  ]);

  function addTodo() {
    setTodo([
      ...todo,
      { title: "New Task", description: "Added item", read: false },
    ]);
  }

  return (
    <div>
      <button onClick={addTodo}>Add todo</button>
      {todo.map((item, index) => (
        <Display
          key={index}
          title={item.title}
          description={item.description}
          done={item.read}
        />
      ))}
    </div>
  );
};

export default App;
