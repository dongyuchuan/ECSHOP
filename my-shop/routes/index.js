var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var GoodsModel = require("../model/Goods")
var multiparty = require('multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home', {});
});
router.post('/api/home33', function(req, res, next) {
  res.render('home', {});
});


//后台商城主页面  二级路由  获取get请求的参数值
router.get('/shop_index', function(req, res, next) {
  res.render('shop_index', { title: '商城首页' });
});

//后台商城主页面   二级路由  获取post请求的参数值
router.post('/api/shop_index4ajax', function(req, res, next) {
  res.send('shop_index');
});


//后台登录页面
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'ECSHOP' });
});


//后台登录页面  
router.post('/api/admin_index', function(req, res, next) {
		var username = req.body.username;
		var psw = req.body.psw;
		var result = {
			code:1,
			message:"登录成功"
		}
		UserModel.find({username:username,psw:psw},(err,docs)=>{
			if(docs.length=0){
				req.code==-101;
				req.message="您的账号或密码错误。请重新登录"
			}else{
				req.session.username=username
			}
			res.json(result);
		})
});


//后台 addgoods页面
router.get('/addgoods', function(req, res, next) {
  res.render('addgoods', {});
});

//后台 addgoods页面
router.post('/api/addgoodsAction', function(req, res, next) {
	var form = new multiparty.Form({
		uploadDir:"public/images"
	})
	var result = {
		code: 1,
		message: "商品信息保存成功"
	};
	form.parse(req, function(err, fields, files){
		if(err) {
			console.log(err);
		}
		console.log(fields);
		var goods_name = fields.goods_name[0]; //商品名称
		var cargo = fields.cargo[0]; //商品货号
		var brand = fields.brand[0]; //商品品牌
		var myprice = fields.myprice[0]; //本店售价
		var waiprice = fields.waiprice[0]; //市场售价
		var goodsimg =(files.goodsimg[0].path).replace("public\\","")
		var inventory = fields.inventory[0];//库存
    var sales = fields.sales[0];//虚拟销量
    //  	console.log(good_name)
		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.cargo = cargo;
		gm,brand = brand;
		gm.myprice = myprice;
		gm.waiprice = waiprice;
		gm.goodsimg = goodsimg;
    gm.inventory = inventory;
    gm.sales = sales;
		gm.save(function(err){
			if(err) {
				result.code = -99;
				result.message = "商品保存失败";
			}
			res.json(result);
		})
	})
});

//后台商品管理页面 实时更新
router.get('/updatagoods', function(req, res, next) {
		GoodsModel.find({},function(err,docs){
			console.log(docs.length)
			res.json(docs)
		})
});


//删除
router.get('/update', function(req, res, next) {
		var id = req.query.id;
		console.log(id);
		GoodsModel.update({id:id},{$regex:{indate:0}}, function(err){
			if(err){
				console.log(err);
			}else{
				res.send("删除成功");
			}
		})
});
module.exports = router;