import React from 'react'
export default function heightFunctionComp(Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
			super(props)
			this.state = {
                type:'genius'
            }
		} 
        handleClickChange=(key,value)=>{
            this.setState({
              [key]:value,
            })
          }
        render(){
            return(
                <Comp handleClickChange={this.handleClickChange} state={this.state} {...this.props}></Comp>
            )
        }
    }
}

