const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

var multer  = require('multer');
var path = require('path');
// const md5 = require('md5');
// var User=[] ;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads/users')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
});

var upload = multer({ storage: storage }).single('image')

function fileFilter (req, file, cb){
  var extFile = path.extname(file.originalname);
    // mime type test
    var filetypeallowed = /(png|gif|jpg)/;
    var mimetype = filetypeallowed.test(file.mimetype); // return boolean
    // cek jika extension bukan png|gif|jpg atau mimetype tidak sama dengan filetypeallowed
    if(!mimetype){
        // skip uploadnya
        cb(null, false)
    } else {
        cb(null, true)
    }
}

module.exports = {
  upload :(req, res, err)=>{
          const id_user = req.params.id_user;
          userModel.getUsers()
          .then((data)=>{
              let users = data;
              users.filter((user)=>{
                console.log('filter user ->',user.id.toString());
                console.log('id_user ->',id_user);
                console.log(user.id.toString() === id_user);
                if(user.id.toString() === id_user){
                  //uploadimage
                  const uploadStatus = new Promise((resolve, reject)=>{
                    let dataImage = multer({ storage: storage ,fileFilter: fileFilter}).single('image');

                    dataImage(req, res, err => {
                      if (req.file) {
                        resolve(req.file.filename)
                      }else {
                        reject(res.json({
                          message:'image gagal upload',
                          rules:'file harus jpg|png|gif'
                        }));
                      }
                    });
                  });

                  uploadStatus.then(
                    function(filename) {
                      const image = `${process.env.REACT_APP_URL_UPLOADS+'users/'+filename}`;
                      user.image = image;
                      userModel.updateUser(user, user.id).then((result)=>{
                        console.log(result.message);
                        res.json({
                            message: `${image}`
                        })
                      }).catch(err=>new Error(err));
                    }
                  )

                }
              })

          }).catch(err=>console.log(err))
      //   }
      // ).catch(err=>console.log(err))
  },
    update :(req, res, err)=>{

        const user = {
            name:req.body.name,
            password:req.body.password,
            status:req.body.status
        }
        console.log(req.body);
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
    view :(req, res)=>{
        userModel.detailUser(req.params.id_user).then((result)=>{
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
                              res.json({
                                  message: 'Login Success!',
                                  user:user,
                              });
                            }).catch(err=>new Error(err));
                        }
                    })
                }

            })
            .catch(err=>console.log(err));

    },
    signup : (req, res)=>{ // sign up cashier
        //get user
        console.log(req.body);

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
                    status:req.body.status,
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
