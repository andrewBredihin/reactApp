import  { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar">
            <div>
                <h1 className="navH1WhiteText">Space</h1><h1 className="navH1RedText">News</h1>
            </div>
            <ul>
                <li><NavLink className="navLink" to="/">News</NavLink></li>
                <li><NavLink className="navLink" to="/about">About</NavLink></li>
            </ul>
        </div>
    )
}

export default Navbar;