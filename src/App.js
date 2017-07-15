import React from "react"
import{HashRouter,Route} from "react-router-dom"
import Header from "./commount/Header"
import Footer from "./commount/Footer"
import Home from "./commount/Home"
import Topic from "./commount/Topic"
import Message from "./commount/Message"
import People from "./commount/People"
import Collect from "./commount/Collect"
class App extends React.Component{
    componentWillMount(){
        sessionStorage.removeItem('accesstoken')
    }
    render(){
        return(
            <HashRouter>
                <div>
                    <Header />
                    <div style={{minHeight:"300px"}}>
                        <Route path="/" exact component={Home} />
                        <Route path="/topic/:id" component={Topic} />
                        <Route path="/message" component={Message} />
                        <Route path="/user/:loginname" component={People} />
                        <Route path="/topic_collect/:loginname" component={Collect} />
                    </div>

                    <Footer />
                </div>

            </HashRouter>


        )
    }
}
export default App