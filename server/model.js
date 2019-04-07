const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017'
mongoose.connect(DB_URL)


const models = {
	user:{
		'user':{type:String, 'require':true},
		'pwd':{type:String, 'require':true},
		'type':{'type':String, 'require':true},
		//头像
		'avatar':{'type':String},
		// 个人简介或者职位简介
		'desc':{'type':String},
		// 职位名
		'title':{'type':String},
		// 如果你是boss 还有两个字段
		'company':{'type':String},
		'money':{'type':String},
		
		'phone':{'type':String}
	},
	chat:{
		'from':{ 'type':String,require:true }, //接收
		'to':{ 'type':String,require:true }, //发给谁
		'content':{ 'type':String,require:true,default:''}, //聊天内容
		'create_time':{ 'type':Number,default:new Date().getTime()}, //时间
		'chatid':{ 'type':String,require:true }, //用户id
		'read':{'type':Boolean,default:false}  //是否已读   只有to才为true
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}
