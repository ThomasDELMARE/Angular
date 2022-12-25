let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usersSchema = Schema({
    id: Number,
    admin: Boolean,
    login: String,
    password: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('users', usersSchema);
