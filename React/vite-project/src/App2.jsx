import { createContext, useContext, useState } from "react";

const BulbContext = createContext();

function BulbProvider({ children }) {
  const [bulbOn, setBulbOn] = useState(true);
  return (
    <BulbContext.Provider
      value={{
        bulbOn: bulbOn,
        setBulbOn: setBulbOn,
      }}
    >
      {children}
    </BulbContext.Provider>
  );
}

const App2 = () => {
  return (
    <div>
      <BulbProvider>
        <Lightbulb />
      </BulbProvider>
    </div>
  );
  function Lightbulb() {
    return (
      <div>
        <BulbState />
        <ToggleBulbState />
      </div>
    );
  }

  function BulbState() {
    const { bulbOn } = useContext(BulbContext);
    return <div>{bulbOn ? "Bulb is on" : "Bulb is off"}</div>;
  }

  function ToggleBulbState() {
    const { setBulbOn } = useContext(BulbContext);
    function Change() {
      setBulbOn((x) => !x);
    }
    return (
      <>
        <button onClick={Change}>Toggle the bulb</button>
      </>
    );
  }
};

export default App2;
