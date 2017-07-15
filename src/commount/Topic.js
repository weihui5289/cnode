import React from "react"
import{ Link,NavLink } from "react-router-dom"
import axios from "axios"
import {url} from '../config'
import {message,Card,Avatar,BackTop,Input,Button,Icon,Modal} from 'antd';
import { Spin } from 'antd';
import moment from 'moment'
const { TextArea } = Input;
class Topic extends React.Component{
    constructor(){
        super()
        this.state={
            data:null,
            communt:"",
            visible:false,
            reply:"",
            replyAll:null,
            collect:false,
            word:[]

        }
    }
    getPost(){
        let id=this.props.match.params.id
        // console.log(this.props)
        axios.get(`${url}/topic/${id}`)
        .then(res=>this.setState({
            data:res.data.data
        }))
        .catch(err=>message.error("请再次请求"))
    }
    componentDidMount(){
        this.getPost()
    }
    handleHfu(item){
        // console.log(item)
        this.setState({
            visible:true,
            replyAll:item,
            reply:`@${item.author.loginname} `})

    }
    handleLike(reply_id){
            if(sessionStorage.accesstoken){
            var accesstoken1=sessionStorage.accesstoken
             }else{
                  message.error("请先登录")
                  return
                }
           axios.post(`${url}/reply/${reply_id}/ups`,{accesstoken:accesstoken1})
           .then(res=>{
            this.getPost()
           })
           .catch(err=>message.error("点赞失败"))
       }

     handleCollect(){
          let accesstoken=sessionStorage.accesstoken
          let topic_id =this.props.match.params.id
          if(accesstoken){
            axios.post(`${url}/topic_collect/collect`,{accesstoken,topic_id})
            .then(res=>{
              message.success("收藏成功")
              this.setState({collect:true});
            })
            .catch(err =>message.error("请再次请求"))
          }else{
            message.error("请先登录在请求")
          }
       }

      handleCancel(){
        let accesstoken=sessionStorage.accesstoken
          let topic_id =this.props.match.params.id
          if(accesstoken){
            axios.post(`${url}/topic_collect/de_collect`,{accesstoken,topic_id})
            .then(res=>{
              message.success("取消收藏")
              this.setState({collect:false,word: this.state.data.filter(item=>item.id!==topic_id)});
            })
            .catch(err =>message.error("请再次请求"))
          }else{
            message.error("请先登录在请求")
          }
       }

    handleCommit(type){
        if(sessionStorage.accesstoken){
            var accesstoken1=sessionStorage.accesstoken
            // console.log(accesstoken1)
           if(type==="communt"){
                var communt=this.state.communt
           }else{
                var communt=this.state.reply
           }

            axios.post(`${url}/topic/${this.props.match.params.id}/replies`, {accesstoken:accesstoken1,content:communt})
            // console.log(this.props.match.params.id)
            .then(res=>{
                this.getPost()
                this.setState({communt:""})
                if(type==="reply") this.setState({visible:false})

                })
            .catch(err=>message.error("评论失败"))

        }else{
          message.error("请先登录")
          return
        }

    }

    render(){
        // console.log(this.props)
        let {data,communt,visible,reply,replyAll,collect,word}=this.state
        // console.log(data)
        return(
            <div>
               <Card>
                 {
                    data?
                     <div style={{padding:'10px'}}>

                            <h1 style={{textAlign:"center"}}>{data.title}</h1>
                        <div className="topic-text">
                             <Avatar src={data.author.avatar_url} />

                            <span style={{color:"#2E7D32",marginRight:"18px"}}>回复量：<strong />{data.reply_count}</span>
                            <span style={{color:"#FF9800",marginRight:"18px"}}>访问量：  <strong /> {data.visit_count}</span>
                            <span style={{color:"#3F51B5"}}>时间：{data.create_at}</span>

                            <Button onClick={!collect?this.handleCollect.bind(this):this.handleCancel.bind(this)} style={{marginTop:'10px',marginLeft:"50px"}} type="primary">{collect?"取消收藏":"收藏"}</Button>
                        </div>


                        <div className="content-word" dangerouslySetInnerHTML={{__html:data.content}} />
                        <div style={{marginTop:"20px"}}>
                            <h2 style={{marginBottom:"10px",textAlign:"center"}}>发表评论</h2>
                            <Input type="textarea" rows={6} value={communt} onChange={e=>this.setState({communt:e.target.value})} placeholder="请发表你的言论"/>
                            <Button style={{marginTop:"10px",float:"right"}} type="primary" onClick={this.handleCommit.bind(this,"communt")}>发表</Button>
                        </div>
                        <div style={{marginTop:"35px"}}>
                            <h1>评论回复</h1>
                            {
                                data.replies.map((item,index)=>
                                <div key={item.id}  className="all">

                                    <NavLink to={{pathname:`/user/${item.author.loginname}`,state:item.author.loginname}}><Avatar src={item.author.avatar_url} style={{marginRight:"20px"}} /></NavLink>


                                <div className="all-right">
                                    <div className="all-mid">
                                        <span style={{fontSize:"16px"}}>{item.author.loginname}&nbsp;&nbsp;&nbsp;{`${index+1}楼`}--{moment(item.create_at).fromNow()}</span>
                                         <span><Icon type="like" onClick={this.handleLike.bind(this,item.id)} />{item.ups.length}&nbsp;&nbsp;&nbsp;&nbsp;
                                         <Icon type="message" onClick={this.handleHfu.bind(this,item)} />
                                         </span>
                                    </div>
                                     <div style={{fontSize:"18px",color:"#000"}}  dangerouslySetInnerHTML={{__html:item.content}} />

                                </div>

                                </div>

                             )}
                        </div>

                     </div>
                        :
                     <div style={{textAlign:"center"}}>
                     <Spin size="large" />
                    </div>

                }
                </Card>
                <Modal
                  title={replyAll?`回复：${replyAll.author.loginname}`:"没有人回复"}
                  visible={visible}
                  onOk={this.handleCommit.bind(this,"reply")}
                  onCancel={()=>this.setState({visible:false})}
                >
                 <Input type="textarea" rows={6} value={reply} onChange={e=>this.setState({reply:e.target.value})} />
                </Modal>
                <BackTop>
                  <div className="ant-back-top-inner">UP</div>
                </BackTop>
            </div>
        )
    }
}
export default Topic