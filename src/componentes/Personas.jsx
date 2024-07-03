import { Component } from "react";

export default class Persona extends Component{
    constructor(props){
        super(props)
        this.state={
            persona_id:"",
            documento:"",
            nombres:"",
            apellidos:"",
            fechaNac:"",
            telefono:"",
            domicilio:"",
            mail:""
        }
    }

    componentDidMount(){
        this.setState({
            persona_id:this.props.persona_id,
            nombres:this.props.nombres,
            apellidos:this.props.apellidos,
            documento:this.props.documento,
            domicilio:this.props.domicilio,
            fechaNac:this.props.fechaNac,
            mail:this.props.mail,
            telefono:this.props.telefono,
        })
    }

    render(){
        const{nombres,apellidos,documento,fechaNac,telefono,domicilio,mail,persona_id}=this.props
        let dataPersona
        return(
            <div className="TarjetaPersona">
                
                <div className="Botones">
                    <button onClick={()=>this.props.borrarPersona(persona_id)}>Borrar</button>
                    <button onClick={()=>{
                        dataPersona={nombres,apellidos,documento,fechaNac,telefono,domicilio,mail,persona_id}
                        this.props.modificar(dataPersona)}}
                    >Modificar</button>
                </div>
            
                <div className="DataPersona">
                    <h2>{nombres}</h2>
                    <h2>{apellidos}</h2>
                    <h2>{documento}</h2>
                    <h2>{fechaNac}</h2>
                    <h2>{telefono}</h2>
                    <h2>{domicilio}</h2>
                    <h2>{mail}</h2>
                </div>
            </div>
        )
    }
}
