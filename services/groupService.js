const Group = require('../models/groupModel');
const User = require('../models/userModel')

function addGroup(req, res) {
  let newGroup = new Group(req.body);
  newGroup
    .save()
    .then((data) => {
      if (data) {
        console.log(data);
        res.send("done");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(403).send("error!");
    });
}

function addUserstoGroup(req,res){ // the body must have group_id and user_id who want to join the group 
  Group.findById(req.body.group_id).then((data)=>{
    if(data){
      data.users_id.push(req.body.user_id)
      res.send(data)
    }
  }).catch((err)=>{
    console.log(err)
  })
}

module.exports = {addGroup,addUserstoGroup}