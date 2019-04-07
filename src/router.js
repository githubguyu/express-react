import React from 'react' 
import { Route, BrowserRouter, Switch } from 'react-router-dom' 
import Dashboard from './page/dashboard'
import Login from './container/login'
import Register from './container/register'
import AuthRoute from './common/authRoute'
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'
import Chat from './common/chat'
export default class Router extends React.Component{
  
    render(){
        return(
            <BrowserRouter>            
                     <AuthRoute/>
                     <Switch>    
                        <Route path='/bossinfo' component={BossInfo}/>
                        <Route path='/geniusinfo' component={GeniusInfo}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/chat' component={Chat}/>
                        <Dashboard/>
                      </Switch>
            </BrowserRouter>
        )
    }
}
