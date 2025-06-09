import { useState } from "react";

function useCounter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount((count) => count + 1);
  }
  return {
    count: count,
    increaseCount: increaseCount,
  };
}

const App3 = () => {
  return (
    <div>
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
};

function Counter() {
  const { count, increaseCount } = useCounter();
  return <div>
    <button onClick={increaseCount}>Increse {count}</button>
  </div>;
}

export default App3;
