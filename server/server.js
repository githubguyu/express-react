const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')

const app = express()
const server = require('http').Server(app)  //express 和 io  联合
const io = require('socket.io')(server)
io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        const { from, to, msg } = data
        // console.log(data)
        // io.emit('recvmsg',data)
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(8080,function() {
    console.log("node app")
})





