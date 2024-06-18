import { Component } from 'react';

export default class FormularioLogin extends Component{
    constructor(props){
        super(props)
        this.state={ 
            usuario:"",
            contrasena:"",
        }      
    }

    render(){
        const {usuario, contrasena}=this.state
        return(
            <div className='Formulario'>

                <h3>Iniciar Sesion</h3>
                
                <div>
                    <input type="text" 
                        placeholder='Usuario'
                        value={usuario}
                        onChange={(e)=>this.setState({usuario:e.target.value})}
                    />
                
                    <input type="password"
                        placeholder='Contraseña'
                        value={contrasena}
                        onChange={(e)=>this.setState({contrasena:e.target.value})}
                    />
                </div>
            
                <button onClick={()=>this.props.ingresar(usuario, contrasena)}>
                    login
                </button>
            </div>
        );
    }
}