async function getREcentPost (){
    console.log("Before sending request");
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(response);
    console.log("After reciving the request");
    const posts = document.querySelector('#Post');
    posts.innerHTML = `
        <h3>UserId: ${response.data.userId}</h3>
        <h3>Title: ${response.data.title}</h3>
        <h3>Body: ${response.data.body}</h3>`
}

getREcentPost();