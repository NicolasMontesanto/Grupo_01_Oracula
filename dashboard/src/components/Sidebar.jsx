import React from "react";
import Logo from "../assets/Logo.png"
import {Link} from "react-router-dom"

function Sidebar() {
    return (
        <ul className="sidebar" id="sidebar">
            <div>
                <Link to="/" exact> <img src={Logo} className="sidebar__logo" alt="Logo-Orácula"></img> </Link>
            </div>
            <div>
                <h1 className="sidebar__title">
                    <Link to="/" exact>Orácula</Link>
                </h1>
            </div>
            <li className="sidebar__link" id="linkProductos">
                <Link to="/productos">Productos</Link>
            </li>
            <li className="sidebar__link" id="linkUsuarixs">
                <Link to="/usuarixs">Usuarixs</Link>
            </li>
        </ul>
    )
}

export default Sidebar;