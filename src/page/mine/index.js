import React from 'react'
import {  Button, WhiteSpace, WingBlank } from 'antd-mobile'
import browserCookies from 'browser-cookies'

import { connect } from 'react-redux';
@connect(
    state=>state.getUserRegister,
)
 class User extends React.Component{
   
    handleSignOut=()=>{
        browserCookies.erase('userid')
        window.location.reload();
    }
    handleInforMation=()=>{
        this.props.history.push(`/${this.props.type}info`)
    }
    render(){
      
        return(
           <div>
                <WingBlank>
                    <WhiteSpace/>
                    <Button type="ghost" inline size="small" onClick={ this.handleInforMation } >修改个人资料</Button>
                    <WhiteSpace/>
                    <Button type="ghost" inline size="small" onClick={ this.handleSignOut } >退出</Button>
                    <WhiteSpace/>             
                </WingBlank>  
           </div>
        )
    }
}
export default User;