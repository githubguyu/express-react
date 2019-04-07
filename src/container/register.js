import React from 'react'
import './container.less'
import { List, InputItem, Button, WhiteSpace, WingBlank, Radio } from 'antd-mobile';
import { connect } from 'react-redux'
import { register } from './../redux/action'
import { Redirect } from 'react-router-dom'
import heightFunctionComp from './../common/heightComponent'
const RadioItem = Radio.RadioItem;
 @connect(
         state=>state.getUserRegister,
        {register}
        )
@heightFunctionComp       
 class Register extends React.Component{
      //已有账号跳转至登陆页面 
      handleClickLogin=()=>{
          this.props.history.push('/login')
      }
      //注册提交时读取用的信息
      handleRegister=()=>{
        this.props.register(this.props.state)
      }
    render(){
        return(
            <div className='Login-rigster'>
              { this.props.redirectTo?<Redirect to={this.props.redirectTo} /> : null }
              <WingBlank> 
              <WhiteSpace />    
              <List>
                 <InputItem
                    placeholder="请输入你的用户名"
                    onChange = {value=> this.props.handleClickChange('user',value) }
                  >
                  <div className='fzloginrigster'>用户名</div>
                  
                  </InputItem>
                  <InputItem
                    placeholder="请输入你的密码"
                    onChange = {value=> this.props.handleClickChange('pwd',value) }                    
                    type='password'
                    maxLength='8'
                  
                 >
                 <div className='fzloginrigster'>密码</div>
                 </InputItem>
                 <InputItem
                    placeholder="请再次输入你的密码"
                    onChange = {value=> this.props.handleClickChange('repeatpwd',value) }                    
                    type='password'
                    maxLength='8'
                
                 >
                 <div className='fzloginrigster'>确认密码</div>
                 </InputItem>
                 
                 {/* { identity.map(i => (
                    <RadioItem key={i.value} checked={this.props.type === i.value} onChange={() => this.props.handleClickChange('type',i.value)}>
                      <div className='fzloginrigster'>{i.label}</div>
                    </RadioItem>
                  )) } */}
                 <RadioItem
                    checked={ this.props.state.type==='genius' }
                    onChange={()=>this.props.handleClickChange('type','genius')}
                  >
                    <div className='fzloginrigster'>牛人</div>
                  </RadioItem>
                  <RadioItem
                    checked={this.props.state.type==='boss'}
                    onChange={()=>this.props.handleClickChange('type','boss')}
                  >
                    <div className='fzloginrigster'>BOSS</div>
                </RadioItem>
                 <WhiteSpace />
                 { this.props.msg ? <span className='err-msg'>{this.props.msg}</span>:null }
                 <Button type="primary" onClick={this.handleRegister}>注册</Button>
                 <div className='iconBox' onClick={this.handleClickLogin}>
                   <div className='iconLogin'> > </div>
                   <span className='iconLoginPrigster'>已有账号立即登录</span>
                 </div>
                 <WhiteSpace />
             </List>
             </WingBlank>              
            </div>
        )
    }
}
export default Register;