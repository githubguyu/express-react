import React from 'react'
import { NavBar, WhiteSpace, InputItem ,Button ,WingBlank ,TextareaItem } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import AvatarSelector from './../common/avatarSelector'
import { connect } from 'react-redux';
import { update } from './../redux/action'
@connect(
    state=>state.getUserRegister,
    { update }
)
 class GeniusInfo extends React.Component{
     state = {
         title:'',
         money:'',
         phone:'',
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
                    <NavBar mode="dark">牛人信息完善</NavBar>
                <WingBlank>
                    <AvatarSelector selectAvatar={(imgname)=>{
                            this.setState({
                                avatar:imgname
                            })
                        }} 
                    />
                    <InputItem
                        defaultValue = { this.props.title ? this.props.title : '' }
                        placeholder='应聘职位名称' 
                        onChange={ v=>{ this.handlePosition('title',v)} }>职位名称：</InputItem>
                    <InputItem defaultValue = { this.props.money ? this.props.money : '' } placeholder='例如：3k~3.5k' onChange={ v=>{ this.handlePosition('money',v)} }>期望薪资：</InputItem>
                    <InputItem defaultValue = { this.props.phone ? this.props.phone : '' } placeholder='例如：13565479632' onChange={ v=>{ this.handlePosition('phone',v)} }  type="phone">联系电话：</InputItem>
                    <TextareaItem 
                     defaultValue = { this.props.desc ? this.props.desc : '' }
                     rows = {1}
                     autoHeight   
                     title='个人简介：'
                     placeholder='请输入工作经验'
                     onChange={ v=>{ this.handlePosition('desc',v)} }/>
                    <WhiteSpace/>   
                    <Button type='primary' onClick={()=>{
                        this.props.update(this.state)
                    }}>保存个人信息</Button>   
                </WingBlank> 
           </div>
        )
    }
}
export default GeniusInfo;