import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
// import './index.less'
@connect(
    state => state,{}
)
 class Mine extends React.Component{
   getLastNew(arr){
       return arr[arr.length-1]
   }

    render(){
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.getUserRegister._id
        const userinfo = this.props.chatNews.users
        const msgs = this.props.chatNews.chatmsg
        const newMsgs = msgs.filter( v => v.to===userid || v.from===userid )
        const msgGroup = {}
        newMsgs.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        });
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const first_a = this.getLastNew(a).create_time
            const last_b = this.getLastNew(b).create_time
            return last_b - first_a
    })
        return(
            <div id = 'msgList'>
               
                    { chatList.map(v=>{
                        const getLastNew = this.getLastNew(v)
                        const target = v[0].from === userid ? v[0].to : v[0].from 
                        const name =  userinfo[target].name
                        const unreadNumber = v.filter( item=> !item.read && item.to === userid ).length
                        return <List  key = { getLastNew._id } >
                                    <Item
                                        extra={ <Badge text = { unreadNumber } /> }
                                        thumb = { require(`./../../../public/img/${userinfo[target].avatar}.png`) }
                                        onClick = { ()=>{
                                              this.props.history.push('/chat',{query:{userid:target}})
                                        }}
                                    >
                                        { getLastNew.content }  
                                        
                                        <Brief>{ name }</Brief>
                                </Item>
                              </List>
                    }) }
            </div>
        )
    }
}
export default Mine;