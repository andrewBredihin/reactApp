import Navbar from '../components/navbar/navbar'
import  { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import News from '../components/news/news'
import About from '../components/about/about'
import New from '../components/new/new'
import Error from '../components/error/error'

function Main() {
    return (
        <HashRouter>
            <Navbar></Navbar>
            <div className="content">
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/news" replace />}
                    />
                    <Route path="/news" element={<News/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/news/:id" element={<New/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </div>
        </HashRouter>
    )
}

export default Main;