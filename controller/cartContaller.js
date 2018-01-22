/*
* Created bu zy on2017/12/18.
*/
"use strict"
const mysql=require("mysql");
const cartModel=require("../modal/cartModel");
function list(req,res) {
    let userName="詹姆斯";//用户名称
    let UserId;//用户ID
    let goodsID;
    let goods;//商品详情
    let Count
    cartModel.cart(userName).then(function (data) {//获取用户ID
        UserId=data
        console.log(UserId+"dd")
    }).then(function () {
        let userId=UserId[0].u_id

        cartModel.shoppingCart(userId).then(function (data) {//获取购物车商品ID
            goods=data
            console.log(goods)
        }).then(function () {
                cartModel.Count(UserId).then(function (data) {
                    Count=data
                    res.send({goods:goods,Count:Count});
                })
            })
        })
    };
function update(req,res) {
    let gid=req.body.gid //商品ID
    cartModel.update(gid).then(function (data) {
        res.send("成功")
    })
}

module.exports={
    list,update
}