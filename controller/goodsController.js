/**
 * Created by HT on 2017/12/18 0018.
 */

const goodsModal = require("../modal/goodsModal.js");
//获取全部商品信息
function getAllGoodsInfo(request, response) {
    goodsModal.getAllGoodsInfo()
        .then(function (data) {
            response.send(data)
        })
        .catch(function (err) {
            response.send("请求出错，错误信息：" + err)
        })
}
//获取当前显示的商品信息
function getGoodsInfo(request, response) {
    let cPage = request.body.cPage;
    let pSize = request.body.pSize;
    let reFrame = request.body.reFrame;
    goodsModal.getGoodsInfo(cPage,pSize,reFrame)
        .then(function (data) {
            response.send(data)
        })
        .catch(function (err) {
            response.send("请求出错，错误信息：" + err)
        })
}

module.exports = {
    getAllGoodsInfo,
    getGoodsInfo,
};