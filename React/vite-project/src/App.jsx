import { useState } from "react";
import Create from "../components/create";
import Read from "../components/read";
export default function App() {
  const [users, setUsers] = useState([
    {Name : "John" , Age : 20}
  ]);
  return (
    <div>
      <Create setUsers={setUsers} />
      <Read users={users} />
    </div>
  );
}
