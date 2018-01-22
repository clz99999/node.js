/**
 * Created by HT on 2017/12/18 0018.
 */
const pool = require("./sqlPool.js");
let i=0;
//获取全部商品信息
function getAllGoodsInfo() {
    return new Promise(function (resolve, reject) {
        let sql = `SELECT *,(SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_style) AS 'style',
                    (SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_material) AS 'material',
                    (SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_frame) AS 'frame',
                    (SELECT GROUP_CONCAT(d.dictdata_name) FROM dictionary AS d WHERE  LOCATE(CONCAT(',',d.dict_id,','), g.g_color)>0) AS color 
                    FROM brand AS b RIGHT JOIN goods AS g ON b.b_id=g.b_id WHERE 1=1 ORDER BY g.g_id`;
        pool.query(sql, [])
            .then(function (data) {
                resolve(data)
            })
            .catch(function (err) {
                reject(err)
            })
    })
}
//获取部分商品信息
function getGoodsInfo(cPage,pSize,reFrame) {
    let cPageNum = parseInt(cPage)-1;
    let pSizeNum = parseInt(pSize);
    let start = cPageNum*pSizeNum;
    // `SELECT *,(SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_style) AS 'style',
    //                 (SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_material) AS 'material',
    //                 (SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_frame) AS 'frame',
    //                 (SELECT GROUP_CONCAT(d.dictdata_name) FROM dictionary AS d WHERE  LOCATE(CONCAT(',',d.dict_id,','), g.g_color)>0) AS color
    //                 FROM brand AS b RIGHT JOIN goods AS g ON b.b_id=g.b_id WHERE 1=1 `

    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM goods,brand where goods.b_id=brand.b_id limit ?,?" ;
        // let arr =[];
        // let reFrameNum = parseInt(reFrame);
        // if(reFrameNum===16||reFrameNum===17){
        //     arr.push(reFrame);
        //     sql+="and g.g_frame=? ";
        // }
        // if(1===1){
        //     arr.push(start);
        //     arr.push(pSizeNum);
        //     sql+="ORDER BY g.g_id limit ?,?;";
        // }
        pool.query(sql,[start,pSizeNum])
            .then(function (data) {
                resolve(data)
            })
            .catch(function (err) {
                reject(err)
            })
    })
}

module.exports = {
    getAllGoodsInfo,
    getGoodsInfo,
};