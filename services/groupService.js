const Group = require('../models/groupModel');
const User = require('../models/userModel')

function addGroup(req, res) {
  let newGroup = new Group(req.body);
  newGroup
    .save()
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(403).send("An error occured while creating group");
    });
}

// the body must have group_id and user_id who want to join the group 
function addUserstoGroup(req,res){ 
  Group.findById(req.body.group_id).then((data)=>{
    if(data){
      data.users_id.push(req.body.user_id)
      data.save()
      res.status(200).send(data)
    }
  }).catch((err)=>{
    console.log(err)
    res.status(404).send("Group not found");
  })
}

async function deleteGroup(req,res){
  let group = await Group.findByIdAndDelete(req.body.groupId)
  if(group){
    res.status(201).send("Group deleted successfully")
  }else{
    res.status(404).send("Group not found")
  }
}

async function getAllGroups(req,res){
  let groups = await Group.find({})
  if(groups){
    res.status(201).send(groups)
  }else{
    res.status(404).send("No groups to show")
  }
}

module.exports = {addGroup,addUserstoGroup,deleteGroup,getAllGroups}