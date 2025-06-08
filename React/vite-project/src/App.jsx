// import { useState } from "react";
// import Create from "../components/create";
// import Read from "../components/read";
// export default function App() {
//   const [users, setUsers] = useState([
//     {Name : "John" , Age : 20}
//   ]);
//   return (
//     <div>
//       <Create setUsers={setUsers} />
//       <Read users={users} />
//     </div>
//   );
// }

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout() {
  return (
    <>
      <Link to={"/"}>Home</Link> | <Link to={"/page1"}>page1</Link> |{" "}
      <Link to={"/page2"}>page2</Link>
      <Outlet />
      <div>
        Contact | Get in touch | Email
      </div>
    </>
  );
}
function ErrorPage() {
  return <div>Error not found</div>;
}
function Page1() {
  return (
    <div>
      <h1>Hello from page 1</h1>
    </div>
  );
}
function Page2() {
  const navigate = useNavigate();
  function UserRedirect() {
    navigate("/");
  }
  return (
    <div>
      <h1>Hello from page 2</h1>
      <button onClick={UserRedirect}>To home</button>
    </div>
  );
}
function Landing() {
  return (
    <div>
      <h1>Hello from Landing page</h1>
    </div>
  );
}
