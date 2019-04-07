import React from 'react'
import { NavBar, InputItem, TextareaItem, WingBlank, Button, WhiteSpace } from 'antd-mobile'
import AvatarSelector from './../common/avatarSelector'
import { connect } from 'react-redux'
import { update } from './../redux/action'
import { Redirect } from 'react-router-dom'
@connect(
    state=>state.getUserRegister,
    { update }
)
 class BossInfo extends React.Component{
    state = {
        title:'',
        company:'',
        money:'',
        desc:''
    }
    handlePosition=(key,val)=>{
        this.setState({
            [key]:val    
        })
    }
    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return(
            <div>
               { redirect && redirect!==path ? <Redirect to={ redirect } /> : null }
                 <NavBar mode="dark">Boss信息完善</NavBar>
               <WingBlank>
                 <AvatarSelector selectAvatar={(imgname)=>{
						this.setState({
							avatar:imgname
						})
					 }} 
                 />
                 <InputItem
                    defaultValue = { this.props.title ? this.props.title : '' }
                    placeholder='请输入职位名称' 
                    onChange={ v=>{ this.handlePosition('title',v)} }>招聘职位：</InputItem>
                 <InputItem defaultValue = { this.props.company ? this.props.company : '' } placeholder='请输入公司名称' onChange={ v=>{ this.handlePosition('company',v)} }>公司名称：</InputItem>
                 <InputItem defaultValue = { this.props.money ? this.props.money : '' } placeholder='例如：1000~2000' onChange={ v=>{ this.handlePosition('money',v)} }>职位薪资：</InputItem>
                 <TextareaItem 
                     defaultValue = { this.props.desc ? this.props.desc : '' }
                     rows = {1}
                     autoHeight   
                     title='职位要求：'
                     placeholder='请输入职位信息描述'
                     onChange={ v=>{ this.handlePosition('desc',v)} }/>
                  <WhiteSpace/>   
                  <Button type='primary' onClick={()=>{
                      this.props.update(this.state)
                  }}>保存</Button>  
              </WingBlank>    
            </div>
        )
    }
}
export default BossInfo