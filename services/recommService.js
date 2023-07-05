const groupModel = require("../models/groupModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

async function recommendations(req, res) {
  let groupField = "";
  let usersID = [];
  let allBoughtProductsID = [];
  let usersBought = [];
  let productMatch = [];

  await groupModel.findById(req.body.groupId).then((data) => {
    if (data) {
      usersID = [...data.users_id];
      groupField = data.field;
    } else {
      return res.status(404).send("Group not found");
    }
  });

  await Promise.all(
    usersID.map(async (usr, idx) => {
      await userModel.findById(usr).then((user) => {
        if (user) {
          if (user.bought_products.length !== 0) {
            allBoughtProductsID = [...user.bought_products]
            usersBought.push(usr)
          }
        } else {
          return res.status(404).send("No users in this group");
        }
      });
    })
  );
  
  await Promise.all(
    allBoughtProductsID.map(async (item, index) => {
      await productModel.findById(item).then((prods) => {
        if (prods) {
          if (prods.field.toString() === groupField.toString()) {
            productMatch.push(prods);
          }
        } else {
          return res
            .status(404)
            .send(
              "Users didn't bought product matches with group interests."
            );
        }
      });
    })
  )
  
  if (usersBought.length / usersID.length >= 0.25) {
    return res.status(200).send(productMatch);
  } else {
    return res.status(404).send("No prefered products");
  }

}

module.exports = { recommendations };
