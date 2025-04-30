// Initialize an empty array to store todos
let todos = [];

// Function to add a new todo to the list
function addTodo() {
  const input = document.querySelector("#todoInput");
  const todoText = input.value.trim();

  // If the input is not empty, add the new todo to the list
  if (todoText !== "") {
    todos.push({
      title: todoText,
    });
    input.value = ""; // Clear input after adding
    render(); // Re-render the list
  }
}

// Function to create the components (HTML elements) for each todo item
function createComponents(todo, index) {
  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  const button = document.createElement('button');

  button.innerHTML = "Delete"; // Set the button text to 'Delete'
  h1.innerHTML = todo.title; // Set the todo title as the h1 text

  // Add an event listener to the button to delete the todo when clicked
  button.addEventListener('click', function() {
    deleteTodo(index); // Delete the todo at the specified index
  });

  div.appendChild(h1); // Add the todo title to the div
  div.appendChild(button); // Add the delete button to the div
  return div; // Return the div to be appended to the content
}

// Function to delete a todo from the todos array
function deleteTodo(index) {
  todos.splice(index, 1); // Remove the todo at the given index
  render(); // Re-render the list after deletion
}

// Function to render the entire todo list
function render() {
  const contentDiv = document.querySelector('.content');
  contentDiv.innerHTML = ""; // Clear the existing content

  // Loop through the todos array and create components for each todo
  todos.forEach((todo, index) => {
    const todoElement = createComponents(todo, index); // Create component for each todo
    contentDiv.appendChild(todoElement); // Append the component to the content div
  });
}

// Add event listener to the 'Add' button to add a todo
document.querySelector('#addBtn').addEventListener('click', addTodo);

// Add event listener to the input field to add todo when 'Enter' key is pressed
document.querySelector('#todoInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    addTodo(); // Call the addTodo function when Enter is pressed
  }
});
