import React from "react"
import axios from 'axios'
import {url} from '../config.js'
import {NavLink} from 'react-router-dom'
import {message,Spin,Avatar} from 'antd'
import moment from 'moment'

class Collect extends React.Component{
    constructor(){
        super()
        this.state={
            data:null
        }
    }
    componentDidMount(){
        let accesstoken = this.props.location.state
        axios.get(`${url}/topic_collect/${accesstoken}`)
        .then(res=>this.setState({data:res.data.data}))
        .catch(err=>message.error("没有收藏"))

    }
    render(){
        let {data}=this.state
        let tabs={
            ask:"问答",
            job:"招聘",
            share:"分享",
            all:"全部",
            good:"精华"

        }
        // console.log(data)
        return(
            <div>
                {
                  data?
                    <div>
                    <h3 style={{heigt:"200px",background:"#FBC02D",fontSize:"16px",color:"#D32F2F",padding:"10px",margin:"20px"}}>我的收藏话题：</h3>
                    { data.map(item=>

                      <div key={item.id} className="collect-show">
                       {/*console.log(item)*/}
                          <Avatar shape="square" size="large" icon="user" src={item.author.avatar_url} />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="collect-2">
                              <span style={{background:"#64DD17",color:"#fff"}}>{tabs[item.tab]}</span>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <h3 style={{background:"#1DE9B6",color:"#fff"}}>姓名：{item.author.loginname}</h3>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <span>访问人数：{item.visit_count}</span>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <NavLink to={`/topic/${item.id}`}>{item.title}</NavLink>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span>创建时间：{moment(item.create_at).fromNow()}</span>

                      </div>
                    )}
                    </div>
                  :
                  <div><Spin size="large" /></div>
                }

            </div>
        )
    }
}
export default Collect
