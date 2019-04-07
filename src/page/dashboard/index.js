import React from 'react'
import { NavBar, TabBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { getChatList, recvMsg } from './../../redux/action'
import Genius from './../genius'
import Boss from './../boss'
import Msg from './../msg'
import User from './../mine'
import './index.less'
@withRouter
@connect(
	state=>state,
	{ getChatList, recvMsg }
)
class Dashboard extends React.Component{
	componentDidMount(){
			if(!this.props.chatNews.chatmsg.length){
				this.props.recvMsg()
      	   		 this.props.getChatList()
			}
	}
    render(){
        const { type } = this.props.getUserRegister
        const {pathname} = this.props.location
        const data =[
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Genius,
				hide:type==='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Boss,
				hide:type==='boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
		]
		const number = this.props.chatNews.unread
        return(
            <div>
                <NavBar className='fixd-header' mode="dark">{data.find(item=>item.path===pathname).title}</NavBar>
                <div style={{marginTop:"4rem",marginBottom:"4rem"}}>
						<Switch>
							{data.map(item=>(
								<Route key={item.path} path={item.path} component={item.component}></Route>
							))}
						</Switch>
				</div>
			    <div className='fixd-tacbar'>
				<TabBar>
                     {
                         data.filter(v=>!v.hide).map((item)=>{
                             return <TabBar.Item
										badge={item.text==='消息'? number : ''}
                                        title={item.text}
                                        key={item.path}
                                        icon={{uri: require(`./../../../public/img/${item.icon}.png`)}}
                                        selectedIcon={{uri: require(`./../../../public/img/${item.icon}-active.png`)}}
                                        selected={pathname===item.path}
                                        onPress={()=>{
                                            this.props.history.push(item.path)
                                        }} 
                                    />
                         })
                     }  
                </TabBar>
				</div>
               
            </div>


        )
    }
}
export default Dashboard;