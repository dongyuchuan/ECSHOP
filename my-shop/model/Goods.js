var mongoose = require("mongoose");

//引入商品模型
var Schema = mongoose.Schema;
var Goods = new Schema({
 	goods_name   : String,
    cargo        : Number,
    brand        : String,
    myprice        : Number,
    waiprice        : Number,
    goodsimg        : String,
    inventory        : Number,
    sales        : Number,
    create_date :{ type: Date, default: Date.now }
});

//创建model对象
var GoodsModel = mongoose.model("goods", Goods); //user是表名    User是数据

//公开对象，暴露接口
module.exports = GoodsModel;

