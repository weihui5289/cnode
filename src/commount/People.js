import React from "react"
import axios from "axios"
import {message,Card,Spin,Avatar} from 'antd'
import {url} from '../config'
import moment from 'moment'
import{NavLink} from "react-router-dom"

class People extends React.Component{
    constructor(){
        super()
        this.state={
            data:null
        }
    }
    componentDidMount(){
        let loginname=this.props.location.state
        axios.get(`${url}/user/${loginname}`)
                .then(res =>this.setState({data:res.data.data}))
                .catch( err => message.error('请重新请求头像数据') )
    }
    render(){
        let {data}=this.state
        // console.log(data)
        return(
          <div>
                {
                  data?
                <div style={{ background: '#ECECEC', padding: '30px' }}>

                    <Card title="个人信息展示" bordered={true} style={{ width:"800px",margin:"0 auto" }}>
                      <img src={data.avatar_url} alt="avatar"/>
                        <div className="showcard">
                            <h3>姓名：{data.loginname}</h3>
                             <p>个人积分：{data.score}</p>
                             <p>创建时间：{moment(data.create_at).fromNow()}</p>
                        </div>

                        <div>
                          <h3>最近创建的话题:</h3>
                            {
                            data.recent_topics.map( item =>
                              <div className="showp" key={item.id}>
                                <div>
                                  <Avatar src={item.author.avatar_url} />
                                  &nbsp;
                                  <span>{item.author.loginname}</span>
                                </div>
                                <span ><NavLink to={`/topic/${item.id}`}>{item.title}></NavLink></span>
                                <span style={{float: 'right'}}>{moment(item.create_at).fromNow()}</span>
                              </div>
                            )
                          }
                       </div>

                       <div>
                          <h3>最近参与的话题:</h3>
                            {
                            data.recent_replies.map( item =>
                              <div className="showp" key={item.id}>
                                <div>
                                  <Avatar src={item.author.avatar_url} />
                                  &nbsp;
                                  <span>{item.author.loginname}</span>
                                </div>
                                <span ><NavLink to={`/topic/${item.id}`}>{item.title}></NavLink></span>
                                <span style={{float: 'right'}}>{moment(item.create_at).fromNow()}</span>
                              </div>
                            )
                          }
                       </div>
                    </Card>
                </div>
                :
                <div><Spin size="large" /></div>
                }
            </div>

        )
    }
}
export default People