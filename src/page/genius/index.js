import React from 'react'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { userList } from './../../redux/action'
@connect(
    state=>state.chatuser,
    { userList }
)
 class Genius extends React.Component{
    componentDidMount(){
        this.props.userList('genius')
    }
    handleClickChat=(item)=>{
        this.props.history.push('/chat',{query:{userid:item._id}})
    //   this.props.history.push('/chat/'+item._id) 
    //   console.log(item._id)
     }
    render(){
        return(
            <div>
                 {
                    this.props.userlist.map((item)=>{
                        return  <WingBlank key = {item.user}> 
                        <WhiteSpace size="lg" />
                            <Card full>
                            <Card.Header
                                onClick={ ()=>this.handleClickChat(item) }
                                title={item.user}
                                thumb={require(`./../../../public/img/${item.avatar}.png`)}
                                extra={<span>期望薪资：{item.money}</span>}
                            />
                            <Card.Body>
                                <div className="descText">{item.desc}</div>
                            </Card.Body>
                            <Card.Footer content="联系电话" extra={<div>{item.phone}</div>} />
                            </Card>
                        </WingBlank> 
                    })
                }
            </div>
        )
    }
}
export default Genius;