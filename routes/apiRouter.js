let Router = require('express').Router;
const apiRouter = Router()

let User = require('../db/schema.js').User
// let Post = require('../db/schema.js').Post
let Task = require('../db/schema.js').Task


// apiRouter.get('/users', function(req, res){
//   User.find({}, function(err, results){
//     res.json(results)
//   })
// })

apiRouter.get('/tasks', function(request,respond){
  Task.find({},function(err,results){
    if(err){
      respond.json(err)
    }
    else{
      respond.json(results)
    }
  })
})

apiRouter.post('/tasks', function(request,respond){
  let newTask = new Task(request.body)
  newTask.save(function(err){
    if(err){
      respond.json(err)
    }
    else{
      respond.json(newTask)
    }
  })
})

apiRouter.delete('/tasks/:_id', function(request,respond){
  Task.remove({_id:request.params._id},function(err){
      if(err){
        respond.json(err)
      }
      else{
        respond.json('task is removed successfully')
      }

  })
})

// //read many
// apiRouter.get('/posts/', function(req, res){
//   Post.find(req.query, function(err, results){
//     res.json(results)
//   })
// })

// //read one
// apiRouter.get('/posts/:_id', function(req, res){
//   Post.findOne(req.params, function(err, result){
//     res.json(result)
//   })
// })

// //create one
// apiRouter.post('/posts', function(req, res){
//   let newPost = new Post(req.body)
//   newPost.save(function(err){
//     if(err) return res.json({message: 'error saving'})
//       res.json(newPost)
//   })
// })

// //update one
// apiRouter.put('/posts/:_id', function(req,res) {
//   Post.findOne(req.params, function(err,record) {
//     for (var prop in req.body) {
//       record[prop] = req.body[prop]
//     }
//     record.save(function(err){
//       if(err) return res.json({message: 'error saving'})
//       res.json(record)
//     })
//   })
// })

// //delete one
// apiRouter.delete('/posts/:_id', (req,res) => {
//   Post.remove(req.params,(err) => {
//     res.status(204).json({msg: "record successfully deleted",
//       _id: req.params._id})
//   })
// })

module.exports = apiRouter