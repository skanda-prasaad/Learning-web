export default function Read({users}){
    return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.Name} - {user.Age} years old
          </li>
        ))}
      </ul>
    </div>
  );
}