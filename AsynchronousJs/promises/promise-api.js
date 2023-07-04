// const p = Promise.resolve({id:3})

// p.then((res)=>console.log(
//     res
// ))

const p1 = Promise.reject(new Error('reason for rejection...'))
p1.catch((err)=>console.log(err))

