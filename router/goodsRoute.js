/**
 * Created by HT on 2017/12/18 0018.
 */
const express=require("express");
const myRoute=express.Router();
const goodsControl=require("../controller/goodsController.js");

myRoute.route("/getAllGoodsInfo.do").post(goodsControl.getAllGoodsInfo);//全部商品信息
myRoute.route("/getGoodsInfo.do").post(goodsControl.getGoodsInfo);//当前显示的商品信息

module.exports=myRoute;