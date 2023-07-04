//////////////////////////USING CALLBACK/////////////////////////
// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//       getTopPremiumMovies((movies) => {
//         console.log('Top premium movies: ', movies);
//         sendEmail(customer.email, movies, () => {
//           console.log(`Email sent and the movies are ${movies}`)
//         });
//       });
//     }
//   });
  
//   function getCustomer(id, callback) {
//     setTimeout(() => {
//       callback({ 
//         id: 1, 
//         name: 'Aadarsh', 
//         isGold: true, 
//         email: 'aadarshkumar131@gmail.com' 
//       });
//     }, 2000);  
//   }
  
//   function getTopPremiumMovies(callback) {
//     setTimeout(() => {
//       callback(['Avatar2-3D', 'Avatar2-4D']);
//     }, 2000);
//   }
  
//   function sendEmail(email, movies, callback) {
//     setTimeout(() => {
//       callback();
//     }, 4000);
//   }
  
  //////////////////////////USING ASYNC AWAIT/////////////////////////
 
    
  

   const getCustomer = (id)=>{
    return new Promise((resolve,reject)=>{

      setTimeout(() => {
            resolve( { 
              id: 1, 
              name: 'Aadarsh', 
              isGold: false, 
              email: 'aadarshkumar131@gmail.com' 
            }
      )}, 2000)
    })
 }

  function getTopPremiumMovies(customer) {
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{

        if(customer.isGold)resolve( ['Avatar2-3D', 'Avatar2-4D'])
        reject(new Error('Cannot get the topPremiumMovies becasue user is not GOLD category'))
      },2000)
    })
 }

 async function sendEmail(email, movies) {
  return new Promise((resolve,reject)=>{

    setTimeout(() => {
     resolve( console.log(`Mail Sent to ${email} with movies: ${movies}`))
    }, 4000);
  })
    }
  
    const topMoviesRequest = async()=>{

      try{
        const customer = await getCustomer(1);
      console.log('CUSTOMER--->',customer);
      const movies = await getTopPremiumMovies(customer);
      console.log('MOVIES--->',movies);
      await sendEmail(customer.email,movies)
      }
      catch(err){
        console.log(err.message)
      }
      }
    topMoviesRequest()