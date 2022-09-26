import React, {Component} from "react";
import {Link} from 'react-router-dom';

class Button extends Component{
    constructor(){
        super()
    }

    render(){
        let url = this.props.url;
        let name = this.props.name;
        return(
            <>
                <button className="button">
                    <Link to={url}> {name}</Link>
                </button>
            </>
        )
    }
}

export default Button;