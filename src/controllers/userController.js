const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
// const md5 = require('md5');
// var User=[] ;
module.exports = {
    update :(req, res)=>{
        const user = {
            name:req.body.name,
            password:req.body.password
        }
        userModel.updateUser(user,req.params.id_user).then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },
    delete :(req, res)=>{
        userModel.deleteUser(req.params.id_user).then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },
    login : (req, res)=>{ // cashier login
        //get users
        userModel.getUsers()
            .then((result)=>{
                // user arr
                let users = result;

                if(!req.body.id || !req.body.password){
                    res.json({message: "Please enter both id and password"});
                } else{
                    users.filter((user)=>{
                        // id(int).tosstring()
                        if(user.id.toString() === req.body.id && user.password === req.body.password){
                            //  get token for authentikasi
                            let token = jwt.sign({ id: user.id.toString(), name: user.name }, process.env.PRIVATE_KEY, {expiresIn : '8h'});
                            //  update user.token
                            user.token = token;
                            userModel.updateUser(user, user.id).then((result)=>{
                              // res.json({
                              //     message: 'Login Success!',
                              //     user:user,
                              //     // session:req.session
                              // });
                            }).catch(err=>new Error(err));
                            res.json({
                                message: 'Login Success!',
                                user:user,
                                // session:req.session
                            });
                        }
                    })
                     // message: "Invalid credentials!";
                     res.json({message: "Invalid credentials!"});


                }

            })
            .catch(err=>console.log(err));

    },
    signup : (req, res)=>{ // sign up cashier
        //get user
        let Users = userModel.getUsers();
        Users.then((result)=>{
            // console.log(result);
            if(!req.body.name || !req.body.password){
                    res.status("400");
                    res.send("Invalid details!");
            }else{
                result.filter((user)=>{
                    if(user.name === req.body.name){
                        res.json({
                            message: "User Already Exists! Login or choose another user id"
                        });
                    }
                });
                let newUser = {
                    // id: autoo incremen,
                    name: req.body.name,
                    password: req.body.password,
                    // token:null
                };
                // push new user to tb_user
                let Insert = userModel.insertUser(newUser);
                Insert.then((result)=>{
                    console.log('new user created by Id :'+ result.insertId);
                    newUser.id = result.insertId;

                    // throw response
                    res.json({
                        msg:'signup success',
                        data : newUser
                    });
                });
                Insert.catch(err=>new Error(err));
            }
        });
        Users.catch(err=>new Error(err));
    },
    dataUsers : (req, res)=>{
        let Users = userModel.getUsers();
        Users.then((result)=>{
            res.json({
                result
            })
        })
        Users.catch(err=>new Error(err));
    }
}
