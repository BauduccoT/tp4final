import { Component } from 'react';

export default class FormularioSesion extends Component{
    constructor(props){
        super(props)
        this.state={ 
            user:"",
            pass:"",
        }      
    }

    render(){
        const {user, pass}=this.state
        return(
            <div className='Formulario'>

                <h3>Iniciar Sesion</h3>
                
                <div>
                    <input type="text" 
                        placeholder='Usuario'
                        value={user}
                        onChange={(e)=>this.setState({user:e.target.value})}
                    />
                
                    <input type="password"
                        placeholder='Contraseña'
                        value={pass}
                        onChange={(e)=>this.setState({pass:e.target.value})}
                    />
                </div>
            
                <button onClick={()=>this.props.ingresar(user, pass)}>
                    login
                </button>
            </div>
        );
    }
}