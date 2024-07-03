import { Component } from 'react';

export default class Navbar extends Component{
    constructor(props){
        super(props)
        this.state={
            inputBusqueda:""
        }
    }

    render(){
        return(
            <div className='Navbar'>
                <input type="text" value={this.state.inputBusqueda} onChange={(e)=>this.setState({inputBusqueda:e.target.value})}/>
                <button onClick={()=>this.props.buscarPersona(this.state.inputBusqueda)}>
                    Buscar
                </button>
                <button onClick={()=>this.props.mostrarFormCrear()}>
                    Crear Persona
                </button>
            </div>
        )
    }
}