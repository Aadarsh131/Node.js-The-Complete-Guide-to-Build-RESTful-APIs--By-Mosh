const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("Promise 1")
        resolve({user:"Aadarsh"});
        // reject(new Error('something went wrong!'))
    },2000)
})

const p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("Promise 2")
        // resolve({user:"Atul"});
        reject(new Error('something went wrong!'))

    },2000)
    
})



/*
Promise.all([p1,p2])
//if any of the promise is not resolve(i.e, an error occured), then the output of Promise.all would be the ERROR
    .then((usr)=>console.log(usr))
    .catch((err)=>console.log(err))
*/

Promise.race([p1,p2])
.then((usr)=>console.log(usr))
.catch((err)=>console.log(err))