/*
* Created bu zy on2017/12/18.
*/
"use strict"
const mysql=require("mysql");
const pool=require("./sqlPool")
//获取用户ID  传入用户名
function cart(userName) {
   return new Promise(function (reslove,reject) {
       console.log(userName)
      let  sql="SELECT u_id FROM USER where u_name=?"
       console.log(sql)
       pool.query(sql,[userName]).then(function (data) {
           console.log(data)
           reslove(data)
       }).catch(function (err) {
           console.log(err)
           reject(err)
       })
   })
}
//获取购物车商品ID,传入用户ID
function shoppingCart(UserId) {
    return new Promise(function (reslove,reject) {
        let sql='SELECT *,(SELECT GROUP_CONCAT(d.dictdata_name)FROM dictionary AS d WHERE  LOCATE(CONCAT(\',\',d.dict_id,\',\'),g.g_color)>0) AS color FROM goods AS g JOIN shopping_cart AS s  JOIN USER AS u ON  g.g_id=s.g_id AND s.u_id=u.u_id and  s.state=1';
        pool.query(sql,[parseInt(UserId)]).then(function (data) {
            reslove(data)
        })
    })

}
//获取用户购物车商品的数量
function Count(userID) {
    return new Promise(function (reslove,reject) {
        let  sql="SELECT COUNT(*) AS count FROM shopping_cart WHERE u_id=? AND state=1"
        pool.query(sql,[parseInt(userID[0].u_id)]).then(function (data) {
            reslove(data)
        })
    })
}
//修改状态
function update(gid) {
    return new Promise(function (reslove,reject) {
        let sql='UPDATE shopping_cart SET state=0 where s_id=?';
        pool.query(sql,[parseInt(gid)]).then(function (data) {
            reslove(data);
        }).catch(function(reject){
            reject(err);
        })
    })
}
module.exports={
    cart,
    shoppingCart,
    Count,
    update
}
