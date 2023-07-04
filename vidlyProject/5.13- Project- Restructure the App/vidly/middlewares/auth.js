const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req,res,next)=>{
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Access Denied!! (Token Not found)')

    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
        console.log('decoded value-->>',decoded);
        req.user = decoded //what is this???
        next()
    }catch(ex){
        res.status(400).send('Invalid Token')

    }
}

module.exports = auth