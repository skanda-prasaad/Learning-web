// // making tea...
// // function making(){
// //     return new Promise(resolve => {
// //         setTimeout(function(){
// //             resolve("Tea is done....")
// //         },3000)
// //     })
// // }
// // async function makeTea(){
// //     console.log("Making tea....");
// //     const result = await making();
// //     console.log(result);
// // }

// // makeTea();

// async function fetchWithRetry(url, retries = 3) {
//   for (let i = 1; i <= retries; i++) {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`status: ${response.status}`);
//       const data = response.json();
//       return data;
//     } catch (err) {
//       console.log("Errorr");
//       if (i === retries) console.log("Maximum tries failed");
//     }
//     await new Promise((res) => setTimeout(res, 1000));
//   }
// }

// async function run() {
//   try {
//     const user = await fetchWithRetry(
//       "https://jsonplaceholder.typicode.com/users/"
//     );
//     console.log("User fetched: ", user.name);
//   } catch (err) {
//     console.log(err);
//   }
// }

// // run();

// // return a fake user as fetch

// function wait(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// async function fake() {
//   await wait(2000);
//   return {
//     name: "Alex",
//     age: 20,
//   };
// }

// async function run2() {
//     const data = await fake();
//     console.log(data.name);  
// }
 
// run2()