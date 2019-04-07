import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getChatList, sendMsg, recvMsg, readMsg } from './../../redux/action'
import { getChatId } from './../utils'

import './index.less'

@connect(
    state=>state,
    { getChatList, sendMsg, recvMsg, readMsg }
)
 class Chat extends React.Component{
    state = {
        text:'',
        msg:[],
        name:'',
    }
    componentDidMount(){
		if(!this.props.chatNews.chatmsg.length){
			this.props.recvMsg()
      	    this.props.getChatList()
        }     
    }
    componentWillUnmount(){
        const to = this.props.location.state.query.userid
        this.props.readMsg(to)   
    }
    handleClickSend=()=>{
        // function trim(s){    //去除左右空格
        //     return s.replace(/(^\s*)|(\s*$)/g, "");
        // }
        const from = this.props.getUserRegister._id
        const to = this.props.location.state.query.userid
        const msg = this.state.text.replace(/(\s*$)/g, ""); //去除文本后面的空格  
        if( msg.length > 0 ){
             this.props.sendMsg({ from, to, msg })
             this.setState({ text:'' })   
        }
    }
    handleClickIsGrid = ()=> {
        this.setState({
            isGrid:!this.state.isGrid  
        })
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    
    render(){
        const userid = this.props.getUserRegister._id
        const navbarid = this.props.location.state.query.userid
        const Item = List.Item
        const users = this.props.chatNews.users
        if(!users[navbarid]){
            return null
        }
        const chanid = getChatId(userid,navbarid)
        const chatmsg = this.props.chatNews.chatmsg.filter( v=>v.chatid===chanid )
        const emoji = '😳 😵 😡 😠 😈 👿 👹 👺 💀 👻 👽 👦 👧 👨 👩 👴 👵 👶 👱 👮 👲 👳 👷 👸 💂 🎅 👰 👼 💆 💇 🙍 🙎 🙅 🙆 💏 💑 👪 💪 👈 👉 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💅 💍 🌂 ぁ あ ぃ い ぅ う ぇ え ぉ お か が き ぎ く ぐ け げ こ ご さ ざ し じ す ず せ ぜ そ ぞ た だ ち ぢ っ ょ よ'
                       .split(' ').filter(v=>v).map(v=>({text:v})) 
        return( 
            <div id='chat-apge'>
                 <NavBar 
                        icon={<Icon type="left" />} 
                        onLeftClick={() => this.props.history.goBack() }
                    >{ users[navbarid].name }</NavBar>
                    
                 <div style={{ marginBottom:'4rem' , marginTop:'4rem' }}>           
                 { 
                    chatmsg.map((v)=>{
                          const avatar = require(`./../../../public/img/${users[v.from].avatar}.png`)
                          return v.from===navbarid?(
                            <List key={v._id}>
                                <Item
                                    thumb= {avatar}
                                    multipleLine = {true}
                                    wrap = { true }
                                >{ v.content }</Item>
                            </List>  
                          ):(
                            <List key={v._id}>
                                <Item 
                                    className='chat-me'
                                    multipleLine = {true}
                                    wrap = { true }
                                    extra={<img src= { avatar } alt='avatar'/>}
                                    >{v.content}</Item>
                            </List>  
                          )   
                    })
                 }
                 </div>
              
                <List className='stick-footer'>
                    { this.state.isGrid ? 
                        <Grid
                            data= { emoji }
                            columnNum = { 12 }
                            carouselMaxRow = { 3 }
                            isCarousel= { true } 
                            onClick = { (v)=>{ this.setState({ text:this.state.text + v.text }) } }
                        />
                       :null 
                    }
                    <InputItem
                        placeholder='请输入'
                        value={ this.state.text }
                        onChange = { v=>{
                                this.setState({ text:v })
                            }
                        }
                        extra={ 
                            <div>
                                <span className = 'expression' onClick = { this.handleClickIsGrid } > 👺 </span>
                                <span onClick={ ()=>this.handleClickSend() } >发送</span>
                            </div>
                         }
                    ></InputItem>
                </List>
               
            </div>
        )
    }
}
export default Chat;