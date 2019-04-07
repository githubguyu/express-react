import React from 'react'
import { Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './../../redux/action'
import Login from './../../login'
@connect(
    state=>state.reducer,
    { logout }
)
class Headers extends React.Component{
    componentWillMount(){
     
    }
    render(){
        return(
            <div>
                { this.props.isAuth?<Button onClick={ this.props.logout}>注销</Button>:<Redirect  to='/login' component={Login}/> }
                <div>{ this.props.user}您好！</div>
            </div>
        )
    }
}
export default Headers;