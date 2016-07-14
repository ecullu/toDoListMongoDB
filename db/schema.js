const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    // REQUIRED FOR AUTHENTICATION: Do Not Touch
    email: String,
    password: String,
})

const taskSchema = new Schema({
  task: String, 
  description: String,
  status: String
})

module.exports = {
  User: createModel('User', usersSchema),
  Task: createModel('Task', taskSchema)
}
