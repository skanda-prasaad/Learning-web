import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  function OnClickHandler() {
    setCount(count + 1);
  }
  return (
    <div>
      <button onClick={OnClickHandler}>Counter {count}</button>
    </div>
  );
};

export default App;
