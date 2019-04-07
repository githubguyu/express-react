import { combineReducers } from 'redux'
import { type } from "./../action";
import { getRedirectPath } from './../../common/utils'

const initUserRegister = {
     redirectTo:'', 
     msg:'',
     type:'boss',
     user:''
}
const getUserRegister = ( state=initUserRegister, action ) =>{
        switch(action.type){
            case type.ERROR_MSG:  
                return { ...state,msg:action.msg }
            case type.LOAD_DATA:  
                return { ...state,...action.payload }       
            case type.AUTH_SUCCESS:
                return { ...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}       
            default:
               return state;   
        }             
}


const initUser = {
    userlist:[]
}
//展示列表用户信息
const chatuser = (state=initUser, action) =>{
    switch(action.type){
        case type.USER_LIST:
            return { ...state, userlist:action.payload }
        default:
            return state;        
    }
}

//聊天信息reducer
const initNews ={
    chatmsg:[],
    users:{},
    unread:0
}
const chatNews = ( state = initNews, action ) =>{
        switch(action.type){
            case type.MSG_LIST:
                return { ...state, users:action.payload.users , chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read && v.to===action.payload.userid ).length }
            case type.MSG_RECV:
            const number = action.payload.to === action.userid ? 1 : 0
                return { ...state, chatmsg:[...state.chatmsg,action.payload],unread:state.unread + number }
            case type.MSG_READ:
                const { from , num } = action.payload
                return { ...state, chatmsg:state.chatmsg.map(v=>({ ...v,read:from===v.from?true:v.read })) , unread:state.unread - num }
            default:
                return state;
        }
}
//合并多个reducer
export default combineReducers({ getUserRegister, chatuser, chatNews });