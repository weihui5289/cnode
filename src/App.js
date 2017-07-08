import React from "react"
import{HashRouter,Route} from "react-router-dom"
import Header from "./commount/Header"
import Footer from "./commount/Footer"
import Home from "./commount/Home"

class App extends React.Component{
    render(){
        return(
            <HashRouter>
                <div>
                    <Header />

                    <Route path="/" component={Home} />
                    {/*<Route path="/message" component={Message} />*/}
                    <Footer />
                </div>

            </HashRouter>


        )
    }
}
export default App