let User = require('../model/user');

// Récupérer tous les assignments (GET)
function getUsers(req, res){
    User.find((err, users) => {
        if(err){
            res.send(err)
        }

        res.send(users);
    });
}

// Récupérer un assignment par son id (GET)
function getUser(req, res){
    loginRequest = req.query.login;
    passwordRequest = req.query.password;

    User.findOne({login: loginRequest, password: passwordRequest}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
}

// Ajout d'un assignment (POST)
function postUser(req, res){
    let user = new User();
    user.id = req.body.id;
    user.login = req.body.login;
    user.password = req.body.password;
    user.admin = true;

    user.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${user.login} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateUser(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    User.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }
    });

}

// récupère le plus grand id (GET)
function getHighestUserId(req, res){
    let highestId = 0;

    User.find((err, users) => {
        if(err){
            res.send(err)
        }

        for(let i = 0; i < users.length; i++){
            let foundId = parseInt(users[i].id);
            if(foundId > highestId){
                highestId = foundId;
            }
        }

        res.send(highestId.toString());
    });
}

module.exports = { getUsers, postUser, getUser, updateUser, getHighestUserId };