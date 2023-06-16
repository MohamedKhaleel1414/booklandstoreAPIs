const groupModel = require("../models/groupModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

async function recommendations(req, res) {
  let groupField = [];
  let usersID = [];
  let allBoughtProductsID = [];
  let usersBought = [];
  let productMatch = [];
  let responseProduct = [];

  await groupModel.findById(req.body.id).then((data) => {
    if (data) {
      usersID = [...data.users_id];
      groupField.push(data.field);
    } else {
      return res.status(404).send("Group not found");
    }
  });

  await Promise.all(
    usersID.map(async (usr, idx) => {
      await userModel.findById(usr).then((data) => {
        if (data) {
          allBoughtProductsID = [...data.bought_products];
          allBoughtProductsID.map((item, index) => {
            productModel.findById(item).then((dt) => {
              if (dt) {
                if (dt.field.toString() === groupField[0].toString()) {
                  usersBought.push(usr);
                  productMatch.push(item);
                }
              } else {
                return res
                  .status(404)
                  .send(
                    "Users didn't bought product matches with group interests."
                  );
              }
            });
          });
        } else {
          return res.status(404).send("No users in this group");
        }
      });
    })
  );

  if (usersBought.length / usersID.length >= 0.25) {
    await Promise.all(
      productMatch.map(async (item, idx) => {
        await productModel.findById(item).then((data) => {
          if (data) {
            responseProduct.push(data);
          } else {
            return res
              .status(404)
              .send(
                "Users didn't bought product matches with group interests."
              );
          }
        });
      })
    );
    return res.status(200).send(responseProduct);
  } else {
    return res.status(404).send("No prefered products");
  }
}

module.exports = { recommendations };
