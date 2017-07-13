import React from "react"
import axios from "axios"
import {message, Spin} from 'antd';
import{ Link } from "react-router-dom"
import moment from 'moment'
class Message extends React.Component{
   constructor(){
        super()
        this.state={
            data:null
        }
   }
   componentDidMount(){
        let accesstoken =sessionStorage.accesstoken
        if(accesstoken){
            axios.get(`https://cnodejs.org/api/v1/messages?accesstoken=${accesstoken}`)
            .then(res=>this.setState({data:res.data.data}))
            .catch(err=>message.error("失败"))
        }else{
            this.props.history.push("/")
        }
   }

    render(){
        let {data}=this.state
        // console.log(data)
        return(
        <div>
            {
                data?
                <div style={{padding:"20"}}>
                    <h2>未读消息：</h2>
                    {data.hasnot_read_messages.map(item=>(
                        <p key={item.id} style={{fontSize:"20px"}}>
                          {item.author.loginname}在话题
                          <Link to={`/topic/${item.topic.id}`}>{item.topic.title}</Link>
                          {item.type==="reply"?"回复":"@"}了你
                          <span style={{float: 'right'}}>{moment(item.create_at).fromNow()}</span>

                        </p>
                        ))}
                    <h2>已读消息：</h2>
                      {data.has_read_messages.map(item=>(
                        <p key={item.id} style={{fontSize:"20px"}}>
                          {item.author.loginname}在话题
                          <Link to={`/topic/${item.topic.id}`}>{item.topic.title}</Link>
                          {item.type==="reply"?"回复":"@"}了你
                           <span style={{float: 'right'}}>{moment(item.create_at).fromNow()}</span>

                        </p>
                        ))}
                </div>

                :
                <div><Spin size="large" /></div>
            }

        </div>
      )
    }
}
export default Message