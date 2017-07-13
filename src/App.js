import React from "react"
import{HashRouter,Route} from "react-router-dom"
import Header from "./commount/Header"
import Footer from "./commount/Footer"
import Home from "./commount/Home"
import Topic from "./commount/Topic"
import Message from "./commount/Message"
import People from "./commount/People"
class App extends React.Component{
    render(){
        return(
            <HashRouter>
                <div>
                    <Header />
                    <div style={{minHeight:"300px"}}>
                        <Route path="/" exact component={Home} />
                        <Route path="/topic/:id" component={Topic} />
                        <Route path="/message" component={Message} />
                        <Route path="/user" component={People} />
                    </div>

                    <Footer />
                </div>

            </HashRouter>


        )
    }
}
export default App