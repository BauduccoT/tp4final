import { Component } from "react";

export default class Usuario extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {user, nombres, apellidos, documento}=this.props.usuario
        return(
            <div className="TarjetaUsuario">
                <h3>{user}</h3>
                <p>{nombres}</p>
                <p>{apellidos}</p>
                <p>{documento}</p>
            </div>
        );
    }
}