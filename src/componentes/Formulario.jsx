import { Component } from 'react';

export default class Formulario extends Component{
    constructor(props){
        super(props)
        this.state={ 
            usuario:"",
            contrasena:"",
            nombre:"",
            apellido:"",
            dni:"",
        } 
    }

    render(){
        const {usuario, contrasena, nombre, apellido, dni}=this.state
        return(
            <div className='Formulario'>

                <h3>Crear usuario</h3>
                
                <input type="text"
                    placeholder='Usuario'
                    value={usuario}
                    onChange={(e)=>this.setState({usuario:e.target.value})}
                />
            
                <input type="text"
                    placeholder='Contraseña'
                    value={contrasena}
                    onChange={(e)=>this.setState({contrasena:e.target.value})}
                />
            
                <input type="text"
                    placeholder='Nombres'
                    value={nombre}
                    onChange={(e)=>this.setState({nombre:e.target.value})}
                />
            
                <input type="text"
                    placeholder='Apellidos'
                    value={apellido}
                    onChange={(e)=>this.setState({apellido:e.target.value})}
                />
            
                <input type="number"
                    placeholder='DNI'
                    value={dni}
                    onChange={(e)=>this.setState({dni:e.target.value})}
                />
                

                <button onClick={()=>this.props.crear(usuario, contrasena, nombre, apellido, dni)}>
                    Crear Usuario
                </button>   
            </div>
        );
    }
}