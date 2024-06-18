import { Component } from 'react';
import axios from "axios";
import "./App.css";
import Formulario from './componentes/Formulario';
import FormularioLogin from './componentes/FormularioSesion';

export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
      token:""
    }
  }

  crearUsuario(usuario, contrasena, nombre, apellido, dni){
    const url="http://10.0.4.103:3001/api/registrar"
    const data={
      user:usuario,
      pass:contrasena,
      nombres:nombre,
      apellidos:apellido,
      documento:dni
    }
    
    axios.post(url,data)
    .then((resp)=>{
      console.log(resp.data);
    })
    .catch((error)=>{
      console.log(error);
      alert("Error");
    })
  }

  iniciarSesion(usuario, contrasena){
    const url="http://10.0.4.103:3001/api/ingresar"
    const data={
      user:usuario,
      pass:contrasena,
    }
    
    axios.post(url,data)
    .then((resp)=>{
      console.log(resp.data);
      this.setState({token:resp.data.token})
    })
    .catch((error)=>{
      console.log(error);
      alert("Error");
    })
  }

  obtenerLista(){
    const url="http://10.0.4.103:3001/api/private/lista"
    const config={
      headers:{
        Authorization:this.state.token
      }
    }
    
    axios.get(url,config)
    .then((resp)=>{
      console.log(resp.data)
      resp.data.status=="ok"?this.setState({usuarios:resp.data.usuarios}):console.log("No se consiguieron los usuarios")
    })
    .catch((error)=>{
      console.log(error);
      alert("Error");
    })
  }

  private(){
    const url="http://10.0.4.103:3001/api/private"
    const config={
      headers:{
        Authorization:this.state.token
      }
    }
    
    axios.get(url,config)
    .then((resp)=>{
      console.log(resp.data);
    })
    .catch((error)=>{
      console.log(error);
      alert("Error");
    })
  }

  public(){
    const url="http://10.0.4.103:3001/api/public"    
    axios.get(url)
    .then((resp)=>{
      console.log(resp.data);
    })
    .catch((error)=>{
      console.log(error);
      alert("Error");
    })
  }

  borrarLista(){
    this.setState({usuarios:[]})
  }

  render(){
    const {usuarios}=this.state
    return(
      <div className='App'>
        <div className='DivFormularios'>
          <Formulario
            crear={(usuario, contrasena, nombre, apellido, dni)=>this.crearUsuario(usuario, contrasena, nombre, apellido, dni)}
          />
          <FormularioLogin
            ingresar={(usuario, contrasena)=>this.iniciarSesion(usuario, contrasena)}
          />  
        </div>
        <div className='DivBotones'>
          <button onClick={()=>this.obtenerLista()}>Cargar Lista</button>
          <button onClick={()=>this.public()}> Public</button>
          <button onClick={()=>this.private()}>Private</button>
          <button onClick={()=>this.borrarLista()}>Borrar Lista</button>
        </div>
        <div className='DivUsuarios'>
          {usuarios.map((usuario, index)=>
            <Usuario
              usuario={usuario}
              key={usuario._id}
            />
          )}
        </div>
      </div>
    )
  }
}