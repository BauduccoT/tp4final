import { Component } from 'react';

export default class FormularioCrear extends Component{
    constructor(props){
        super(props)
        this.state={
            user:"",
            pass:"",
            nombres:"",
            apellidos:"",
            documento:"",
        } 
    }

    render(){
        const {user, pass, nombres, apellidos, documento}=this.state
        return(
            <div className='Formulario'>

                <h3>Crear usuario</h3>
                
                <input type="text"
                    placeholder='Usuario'
                    value={user}
                    onChange={(e)=>this.setState({user:e.target.value})}
                />
            
                <input type="text"
                    placeholder='Contraseña'
                    value={pass}
                    onChange={(e)=>this.setState({pass:e.target.value})}
                />
            
                <input type="text"
                    placeholder='Nombres'
                    value={nombres}
                    onChange={(e)=>this.setState({nombres:e.target.value})}
                />
            
                <input type="text"
                    placeholder='Apellidos'
                    value={apellidos}
                    onChange={(e)=>this.setState({apellidos:e.target.value})}
                />
            
                <input type="number"
                    placeholder='documento'
                    value={documento}
                    onChange={(e)=>this.setState({documento:e.target.value})}
                />
                

                <button onClick={()=>this.props.crear(user, pass, nombres, apellidos, documento)}>
                    Crear Usuario
                </button>   
            </div>
        );
    }
}