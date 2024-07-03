import { Component } from 'react';

export default class ModalModificar extends Component{
    constructor(props){
        super(props)
        this.state={
            persona_id:"",
            nombres:"",
            apellidos:"",
            documento:"",
            domicilio:"",
            fechaNac:"",
            mail:"",
            telefono:"",
        }
    }

    componentDidMount(){
        this.setState({
            persona_id:this.props.persona.persona_id,
            nombres:this.props.persona.nombres,
            apellidos:this.props.persona.apellidos,
            documento:this.props.persona.documento,
            domicilio:this.props.persona.domicilio,
            fechaNac:this.props.persona.fechaNac,
            mail:this.props.persona.mail,
            telefono:this.props.persona.telefono,
        })
    }

    render(){
        const{persona_id,nombres,apellidos,documento,domicilio,fechaNac,mail,telefono}=this.state
        let dataPersona
        return(
            <div className='Modal'>
                <input type="text" placeholder='Nombres' value={nombres} onChange={(e)=>this.setState({nombres:e.target.value})}/>

                <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e)=>this.setState({apellidos:e.target.value})}/>

                <input type="number" placeholder='Documento' value={documento} onChange={(e)=>this.setState({documento:e.target.value})}/>

                <input type="text" placeholder='Domicilio' value={domicilio} onChange={(e)=>this.setState({domicilio:e.target.value})}/>

                <input type="text" placeholder='Fecha de nacimiento' value={fechaNac} onChange={(e)=>this.setState({fechaNac:e.target.value})}/>

                <input type="text" placeholder='Email' value={mail} onChange={(e)=>this.setState({mail:e.target.value})}/>
                
                <input type="text" placeholder='Teléfono' value={telefono} onChange={(e)=>this.setState({telefono:e.target.value})}/>

                <button onClick={()=>{
                    dataPersona={persona_id,nombres,apellidos,documento,domicilio,fechaNac,mail,telefono}
                    this.props.modificarPersona(dataPersona)}}>Confirmar</button>
                <button onClick={()=>this.props.cerrarModal()}>Cancelar</button>
            </div>
        )
    }
}