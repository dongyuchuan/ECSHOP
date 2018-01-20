var express = require('express'); //框架
var router = express.Router();
var GoodsModel = require("../model/Goods"); //首先导入GoodsModel 的路由文件

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) { // 这是二级路由 一个request，一个response
	var condition = req.query.condition;//分页环境
	//注意代码的健壮性
	//测试中，有异常系测试，后端最头痛的是异常系测试。
	var pageNO =  req.query.pageNO || 1;//页面数量
	pageNO = parseInt(pageNO)
	var perPageCnt = req.query.perPageCnt || 20;
	perPageCnt = parseInt(perPageCnt)
	
  GoodsModel.count({goods_name: {$regex:condition}},function(err,count){
  	console.log("数量:"+count);
  	var query = GoodsModel.find({goods_name:{$regex:condition}}).skip((pageNO-1)*perPageCnt).limit(perPageCnt);
  	query.exec(function(err,docs){
  		console.log(err.docs);
  		var result = {
  			total:count,
  			data:docs,
  			pageNO:pageNO
  		}
  		res.json(result);
  	})
  })
});

module.exports = router;

