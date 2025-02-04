    function getUser(id) {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                console.log('Reading a user from a database...');
                resolve({ id: id, gitHubUsername: 'mosh' });
              }, 2000);
        })
        
      }
      function getRepositories(username) {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
              console.log(`Calling ${username}'s GitHub API...`);
              resolve(['repo1', 'repo2', 'repo3']);
            }, 2000);
        })
      }
      
      function getCommits(repo) {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
              console.log('Calling GitHub API...');
              resolve(['commit']);
            }, 2000);
        })
      } 

     getUser(1)
        .then((user)=>getRepositories(user.gitHubUsername))
        .then((repos)=> getCommits(repos[0]))
        .then((commit)=> console.log(commit))
        .catch(err=>console.log("error",err.message))

     