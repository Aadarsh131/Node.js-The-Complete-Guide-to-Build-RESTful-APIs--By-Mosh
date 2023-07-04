const admin = (req,res,next)=>{
    // const token =  req.header('x-auth-token')
    if(!req.user.isAdmin) res.status(403).send('Access Denied!! Only Admins have the access')
    next()
}

module.exports = admin