// const user = getUser(1);
// console.log(user); // it would be undefined

// function getUser(id) {
//   setTimeout(() => {
//     console.log("blah");
//     return { id: id, name: "aadarsh" };
//   }, 2000);
// }

/* To deal with this asynchronous code, we have 3 ways-
    -callbacks
    -promises
    -async/await (built on top of Promise)
*/

////using callback-
getUser(function (user) {
  console.log("USER", user);
  getRepository(function (repo) {
    console.log("REPOSITORY", repo);
  });
});

function getUser(callback) {
  setTimeout(() => callback({ id: 1, name: "aadarsh" }), 3000);
}

function getRepository(callback) {
  setTimeout(() => callback(["code", "base", "dashboard"]), 3000);
}
