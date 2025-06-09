import { useState } from "react";
import { useFetch } from "./hooks/useFetch"

const App4 = () => {
  const [post, setPost] = useState(1);
  const {finalData} = useFetch("https://jsonplaceholder.typicode.com/posts/"+ post);
  return (
    <div>
        <button onClick={() => setPost(2)}>Post 2</button>
        <button onClick={() => setPost(3)}>Post 3</button>
        <button onClick={() => setPost(4)}>Post 4</button>
        {JSON.stringify(finalData)}
    </div>
  )
}

export default App4