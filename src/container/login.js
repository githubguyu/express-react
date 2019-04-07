import React from 'react'
import { connect } from 'react-redux'
import './container.less'
import { List, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile'
import { login } from './../redux/action'
import { Redirect } from 'react-router-dom'
import heightFunctionComp from './../common/heightComponent/index'
@connect(
  state=>state.getUserRegister,
  { login }
)
@heightFunctionComp
 class Login extends React.Component{
   
    // state = {
    //   user:'',
    //   pwd:''
    //   }
      //保存用户登录信息 onChange事件
      // handleClickChange=(key,value)=>{
      //   this.setState({
      //     [key]:value
      //   })
      // }
    //没有账号跳转至注册页
    handleClickRegister=()=>{
      this.props.history.push('/register')
    }
    //点击登录
    handleLogin=()=>{
      this.props.login(this.props.state)
    }

    render(){
        return(
            <div className='Login-rigster'>
              { this.props.redirectTo?<Redirect to={this.props.redirectTo} /> :null }
              <WingBlank> 
              <WhiteSpace />    
              <List>
                 <InputItem
                    placeholder="请输入你的用户名"
                    onChange = {value=> this.props.handleClickChange('user',value) }
                  >
                  <div className='fzloginrigster'>用户名</div>
                  </InputItem>
                  <WhiteSpace />    
                  <InputItem
                    placeholder="请输入你的密码"
                    onChange = {value=> this.props.handleClickChange('pwd',value) }
                    type='password'
                    maxLength='8'
                    
                 >
                 <div className='fzloginrigster'>密码</div>
                 </InputItem> 
                 <WhiteSpace />   
                 { this.props.msg ? <span className='err-msg'>{this.props.msg}</span>:null }
                 <Button type="primary" onClick={this.handleLogin}>登陆</Button>
                 <div className='iconBox' onClick={this.handleClickRegister}>
                   <div className='iconLogin'> > </div>
                   <span className='iconLoginP'>立即注册</span>
                 </div>
                 <WhiteSpace />
             </List>
             </WingBlank>              
            </div>
        )
    }
}
export default Login;