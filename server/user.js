const express = require('express')
const Router = express.Router()
const utility = require('utility')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')


Router.get('/list',function(req,res){
    const type = req.query.type
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})

const _filter = {
    "pwd":0,"__v":0
}

//注册接口  ...开始
Router.post('/register',function(req,res){
    const { user, pwd, type  } = req.body   
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名已存在'})
        }
        const userModel = new User({ user, type,pwd:md5Pwd(pwd)})
        userModel.save(function(err,doc){
            if(err){
                return res.json({code:1,msg:'数据走丢了'})
            }
            const { user, type, _id } = doc
            res.cookie('userid', _id)
            return res.json({code:0,data:{ user, type, _id }})
        })
            // User.create({ user, type,pwd:md5Pwd(pwd) },function(err,doc){
            //     if(err){
            //         return res.json({code:1,msg:'数据走丢了'})
            //     }
            //     return res.json({code:0})
            // })
        
        
    })
})
//注册接口 ...结束
//登录接口 ...开始
Router.post('/login',function(req,res){
    const { user, pwd } = req.body   
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名不存在或者密码不正确'})
        }
        res.cookie('userid',doc._id)
         return res.json({ code:0,data:doc }) 
    })
})
//登录接口 ...结束

Router.get('/info',function(req, res){
	const {userid} = req.cookies
	if (!userid) {
		return res.json({code:1})
	}
	User.findOne({_id:userid} ,_filter , function(err,doc){
		if (err) {
			return res.json({code:1, msg:'后端出错了'})
		}
		if (doc) {
			return res.json({code:0,data:doc})
		}
	})
})
//完善信息接口 ...开始
Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({ code:0,data})
    })
})

//完善信息接口 ...结束
//md5加密  ...开始
function md5Pwd(pwd){
    const salt = 'rain_very_handsome_3957sdjkhc#@kdshcjkkdfjkj*!=+'
    return utility.md5(utility.md5(pwd+salt))
}
//md5加密  ...结束


//聊天信息接口 ...开始
Router.get('/getmsglist',function(req,res){
    // const userid = req.cookies.userid
    // console.log(user)
    // '$or':[{ from:userid,to:userid }]
    User.find({},function(e,userdoc){
        let users = {}
        // console.log(userdoc)
        userdoc.forEach((v)=>{
            users[v._id] = { name:v.user, avatar:v.avatar }
        })
        Chat.find( {} , function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
                // console.log(doc)
            }
        })
    }) 
})
//聊天信息接口 ...结束
//跟新聊天信息接口  ...开始
Router.post('/readmsg',function(req,res){
    const userid = req.cookies.userid
    const { from } = req.body
    // console.log(userid,from)
    Chat.update({from,to:userid},{read:true},{multi:true},function(err,doc){
        if(!err){
            console.log(doc)
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改失败'})
    })
})
//跟新聊天信息接口  ...结束

Chat.remove({},function(err,doc){
    	console.log(doc)
    })
    // User.remove({},function(err,doc){
    // 	console.log(doc)
    // })
module.exports = Router