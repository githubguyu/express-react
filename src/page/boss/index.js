import React from 'react'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { userList } from './../../redux/action'
// import { withRouter } from 'react-router-dom'
// @withRouter
@connect(
    state=>state.chatuser,
    { userList }
)
 class Boss extends React.Component{
    componentDidMount(){
        this.props.userList('boss')
    }
    handleClickChat=(item)=>{
       this.props.history.push('/chat',{query:{userid:item._id}})
    // this.props.history.push('/chat/'+item._id)
    //    console.log(item.user)
    //   console.log(item._id)

    }
    render(){
        return(
            <div>
                
                {
                    this.props.userlist.map((item)=>{
                        return  <WingBlank key = {item.user}> 
                        <WhiteSpace size="lg" />
                            <Card full >
                            <Card.Header
                                onClick={ ()=>this.handleClickChat(item) }
                                title={item.user}
                                thumb={require(`./../../../public/img/${item.avatar}.png`)}
                                extra={<span>{item.company}</span>}
                            />
                            <Card.Body>
                                <div className="descText">{item.desc}</div>
                            </Card.Body>
                            <Card.Footer content="薪资范围" extra={<div>{item.money}</div>} />
                            </Card>
                        </WingBlank> 
                    })
                }
            </div>
        )
    }
}
export default Boss;