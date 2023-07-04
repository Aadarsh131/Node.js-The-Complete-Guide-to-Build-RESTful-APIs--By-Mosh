/*
getCustomer(1, (customer) => {
    console.log('Customer: ', customer);
    if (customer.isGold) {
      getTopMovies((movies) => {
        console.log('Top movies: ', movies);
        sendEmail(customer.email, movies, () => {
          console.log('Email sent...')
        });
      });
    }
  });
  
  function getCustomer(id, callback) {
    setTimeout(() => {
      callback({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  }
  
  function getTopMovies(callback) {
    setTimeout(() => {
      callback(['movie1', 'movie2']);
    }, 4000);
  }
  
  function sendEmail(email, movies, callback) {
    setTimeout(() => {
      callback();
    }, 4000);
  }

  */

  //Async Await version

  function getCustomer(id) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve({ 
              id: 1, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'email' 
            });
          }, 4000); 
    }) 
     
  }
  
  function getTopMovies() {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);
    })
    
  }
  
  function sendEmail(email, movies) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('Done');
          }, 4000);
      
    })
  }

  async function getData(){
        const customer = await getCustomer(1);
        console.log('fectched customer')
        if(customer.isGold){
            const topmovies = await getTopMovies();
        console.log('fectched TopMovies')

            const email = await sendEmail(customer.email,topmovies)
            console.log(email)
        }
  }
  getData()