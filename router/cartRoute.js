/*
* Created bu zy on2017/12/18.
*/
"use strict"
const myExpress=require("express");
const cartRoute=myExpress.Router();
const cartController=require("../controller/cartContaller");
cartRoute.route("/cart.do").post(function(req,res){
    cartController.list(req,res)
    console.log(111);
});
cartRoute.route('/cartUpdate.do').post(cartController.update);
module.exports = cartRoute;