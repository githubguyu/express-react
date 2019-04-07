import axios from "axios";
import io from 'socket.io-client'
const socket = io('http://localhost:8080')

export const type = {
    AUTH_SUCCESS:'AUTH_SUCCESS',
    ERROR_MSG : 'ERROR_MSG',
    LOAD_DATA:'LOAD_DATA',
    USER_LIST:'USER_LIST',
    MSG_LIST:'MSG_LIST',//聊天信息列表
    MSG_RECV:'MSG_RECV',//读取信息
    MSG_READ:'MSG_READ',//标识已读
}

//验证成功type的公用函数
function authSuccess (obj) {
    const {pwd,...data} = obj
	return {type: type.AUTH_SUCCESS, payload:data}
}
//错误信息提示公用函数
function errorMsg(msg){
    return { msg, type:type.ERROR_MSG }
}

//聊天action 开始
    //所有数据
function msgList(msgs,users,userid){
    return { type:type.MSG_LIST, payload:{ msgs,users,userid } }
}
export function getChatList(){
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist').then((res)=>{
            if(res.status===200 && res.data.code === 0){
                const userid = getState().getUserRegister._id
                dispatch(msgList(res.data.msgs,res.data.users,userid))
            }
        })
    }
}
    //单人数据
function msgRecv(msg,userid){
        return { type:type.MSG_RECV,payload:msg, userid }
    }
export function recvMsg(){
        return (dispatch,getState) =>{
            socket.on('recvmsg',function(data){
                const userid = getState().getUserRegister._id
                dispatch(msgRecv(data,userid))
            })
        }
    }
    //发送数据
export function sendMsg({ from , to , msg }){
    return dispatch=>{
    socket.emit('sendmsg',{ from , to , msg })
    }
}
    //更新更新
function msgRead( { from, userid ,num } ){
    return { type:type.MSG_READ, payload:{ from, userid ,num } }
}
export function readMsg(from){
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{ from })
        .then(res=>{
            const userid = getState().getUserRegister._id
            if(res.status===200 && res.data.code === 0 ){
                dispatch(msgRead({ from, userid ,num:res.data.num }))
            }
        })
    }
}
//聊天action 结束
//注册action  开始
export function register({user,pwd,type,repeatpwd}){
     if(!user || !pwd || !type){
         return errorMsg('请输入用户名和密码')
     }
     if(repeatpwd!==pwd){
        return errorMsg('两次输入密码不一致')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type }).then(res=>{
            if(res.status===200 && res.data.code === 0){
                dispatch(authSuccess({user,pwd,type}))          
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
//注册action  结束
//登录action  开始
export function login ({user,pwd}){
    if(!user || !pwd){
        return errorMsg('请输入用户名和密码')
    }else{
        return dispatch=>{
            axios.post('/user/login',{user,pwd }).then(res=>{
                if(res.status===200 && res.data.code === 0){
                    dispatch(authSuccess(res.data.data))          
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
        }
    }
}
//登录action 结束
//判断用户身份info 开始
export function loadData(userinfo){
	return { type:type.LOAD_DATA, payload:userinfo}
}
//判断用户身份info 结束
//完善用户信息action 开始
export function update(data) {
    return dispatch=>{
        axios.post('/user/update',data)
        .then(res=>{
            if(res.status===200 && res.data.code===0){
               dispatch(authSuccess(res.data.data))          
             }else{
                dispatch(errorMsg(res.data.msg))
             }
                   
        })
    }
}
//完善用户信息action 结束
//boss genius 列表显示数据action  开始 
function userType(data){
    return { type:type.USER_LIST,payload:data}
}
export function userList(type){
    return dispatch=>{
        axios.get('/user/list?type='+ type ).then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(userType(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
             }
        })
    }
}
//boss genius 列表显示数据action  结束 

