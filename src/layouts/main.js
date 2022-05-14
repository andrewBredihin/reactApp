import Navbar from '../components/navbar/navbar'
import  { HashRouter, Routes, Route } from "react-router-dom";
import Home from '../components/home/home'
import News from '../components/news/news'
import About from '../components/about/about'
import New from '../components/new/new'

function Main() {
    return (
        <HashRouter>
            <Navbar></Navbar>
            <div className="content">

                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/news/:id" element={<New/>}/>
                </Routes>
            </div>
        </HashRouter>
    )
}

export default Main;