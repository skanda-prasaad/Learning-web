// import { useState } from "react";

// export default function Create({ setUsers }) {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState(18);

//   function Handler(e) {
//     e.preventDefault();

//     setUsers((prevUsers) => [
//       ...prevUsers,
//       {
//         Name: name,
//         Age: Number(age), // ensures age is stored as a number
//       },
//     ]);

//     setName("");
//     setAge(18); // reset age to default value instead of ""
//   }
//   return (
//     <div>
//       <h1>Form Registration</h1>
//       <form onSubmit={Handler}>
//         <input
//           type="text"
//           placeholder="Fullname"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="number"
//           value={age}
//           placeholder="Age"
//           onChange={(e) => setAge(e.target.value)}
//         />
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// }
