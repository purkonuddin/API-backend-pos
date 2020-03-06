const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
// const md5 = require('md5');
// var User=[] ;
module.exports = {
    logout : (req, res)=>{
        userModel.getUsers()
        .then((result)=>{
            let users = result;
            if(!req.params.user_id){
                res.json({msg: "tidak ada Id User"});
            }else{
                users.filter((user)=>{
                    if(user.id.toString() === req.params.user_id){
                        let token = '';
                        user.token = token;
                        userModel.updateToken(user, user.id)
                        .then((result)=>{
                            res.json({
                                        msg:'user logged out',
                                        result
                                    })
                        })
                        .catch(err=>new Error(err))
                    }
                })
            }
        })
        .catch(err=>new Error(err))

    }
}
