var jwt = require('jsonwebtoken'); 

module.exports ={
  verify: (req, res, next)=>{ 
    token = req.headers['x-access-token'];  
    
    try {
      // jwt.verify(token, secretOrPublicKey, [options, callback])
      // verify a token symmetric - synchronous
      var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      console.log(decoded);
      next();
    } catch (err) {
      console.log(err)
      res.json({
        msg : 'token infalid' 
      })
    }
  }
}
