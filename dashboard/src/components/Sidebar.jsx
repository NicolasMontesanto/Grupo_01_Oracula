import React from "react";
import Logo from "../assets/Logo.png"
import {Link} from "react-router-dom"
import '../css/Sidebar.css'

function Sidebar() {
    return (
        <div className="sidebar" id="sidebar">
            <div>
                <a href="http://localhost:3200/"><img src={Logo} className="sidebar__logo" alt="Logo-Orácula"></img></a>
            </div>
            <div>
                <h1 className="sidebar__title">
                    <Link to="/">Orácula</Link>
                </h1>
            </div>
            <li className="sidebar__link" id="linkProductos">
                <Link to="/productos">Productos</Link>
            </li>
            <li className="sidebar__link" id="linkUsuarixs">
                <Link to="/users">Usuarixs</Link>
            </li>
        </div>
    )
}

export default Sidebar;