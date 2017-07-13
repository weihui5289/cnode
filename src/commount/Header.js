import React from "react"
import axios from "axios"
import { Button,Modal,Input,message,Menu, Dropdown,Avatar,Badge} from 'antd';
import {Link} from "react-router-dom"
import img from "../images/2222_01.png"
class Header extends React.Component{
    constructor(){
        super()
        this.state={
            isLogin:false,
            visible:false,
            input:"c34822ec-4ad8-4a71-b5b0-718e5b5b3a16",
            confirmLoading:false,
            user:null,
            messageCount: null
        }
    }
    handleOk(){
      this.setState({confirmLoading:true})
      let accesstoken=this.state.input.trim()

      axios.post(`https://cnodejs.org/api/v1/accesstoken`,{accesstoken})
      .then(res=>{
        message.success('登录成功')
        // console.log(res)
        this.setState({
          isLogin:true,
          visible:false,
          input:"",
          confirmLoading:false,
          user:res.data
        })
        sessionStorage.accesstoken=accesstoken
        this.getMessage(accesstoken)
      })
      .catch(err=> {
        message.error('请重新登录'),
        this.setState({
          confirmLoading:false,
          input:""
        })
      })
    }

    getMessage(accesstoken){
        axios.get(`https://cnodejs.org/api/v1/message/count?accesstoken=${accesstoken}`)
        .then(res=>this.setState({messageCount:res.data.data}))
        .catch(err=>message.error("没有获取消息"))
    }

    handleOut(){
        this.setState({
          isLogin:false,
          user:null
        })
        sessionStorage.removeItem("accesstoken")
    }
    render(){
        let {isLogin,visible,input,confirmLoading,user,messageCount} = this.state
        // console.log(user)
        const menu = !isLogin? <p>123</p> : (
        <Menu>
          <Menu.Item>
            <h3>{user.loginname}</h3>
          </Menu.Item>
          <Menu.Item>
            <Link to="/message">消息中心</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={{pathname:`/user/${user.loginname}`,state:user.loginname}}>个人中心</Link>
          </Menu.Item>
          <Menu.Item>
            <Button type="danger" onClick={this.handleOut.bind(this)} >登出</Button>
          </Menu.Item>
        </Menu>
      );
        return(
            <header className="header">
                <Link to="/"><img src={img} alt=""/></Link>

                {
                    isLogin?
                    <Dropdown overlay={menu}>
                      <Badge count={messageCount}>
                        <Avatar src={user.avatar_url} />
                      </Badge>
                    </Dropdown>
                    :
                 <div>
                    <Button type="primary" onClick={()=>this.setState({visible:true})}>登录</Button>
                    <Modal
                      title="登录"
                      visible={visible}
                      onOk={this.handleOk.bind(this)}
                      onCancel={()=>this.setState({visible:false})}
                      okText="确认登录"
                      cancelText="取消登录"
                      confirmLoading={confirmLoading}
                     >
                    <Input placeholder="accesstoken" value={input} onChange={(e)=>this.setState({input:e.target.value})} />
                    </Modal>
                 </div>
                }
            </header>
        )
    }
}
export default Header