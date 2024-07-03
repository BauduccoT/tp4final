import { Component } from 'react';
import axios from "axios";
import "./App.css";
import FormularioCrear from './componentes/FormularioCrear';
import FormularioSesion from './componentes/FormularioSesion';
import Persona from './componentes/Personas';
import Navbar from './componentes/Navbar';
import ModalCrear from './componentes/ModalCrear';
import ModalModificar from './componentes/ModalModificar';
import ModalConfirmar from './componentes/ModalConfirmar';

export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
      token:null,
      personas:[],
      personaModif:{},
      varModalModif:false,
      varModalCrear:false,
      varConfirmElim:false,
      varConfirmModif:false
    }
  }

  crearUsuario(user, pass, nombres, apellidos, documento){
    const url="https://personas.ctpoba.edu.ar/api/registrar"
    const data={
      user,
      pass,
      nombres,
      apellidos,
      documento
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



    // HACER COMPROBACION DE QUE CONTRASEÑA Y USUARIO SEAN DISTINTOS DE ""



  iniciarSesion(user, pass){
    const url="https://personas.ctpoba.edu.ar/api/ingresar"
    const data={
      user,
      pass
    }
    
    axios.post(url,data)
    .then((resp)=>{
      console.log(resp.data);
      if(resp.data.token){
        this.setState({token:resp.data.token})
      }
    })
    .catch((error)=>{
      console.log(error);
      alert("Error");
    })
    
  }


  // Error, o hacemos mas inputs para cada dato o buscar con un solo dato en las tres secciones   """" documento,apellidos,nombres""""
  //      documento: documento!==""?documento:null,
  //      apellidos: apellidos!==""?apellidos:null,
  //      nombres:  nombres!==""?nombres:null


  buscarPersona(valorInput){
    const url="https://personas.ctpoba.edu.ar/api/personas"
    const config={
      params:{
        documento: valorInput!==""?valorInput:null,
        apellidos: valorInput!==""?valorInput:null,
        nombres:  valorInput!==""?valorInput:null
      },
      headers:{
        authorization: this.state.token
      }
    }
    axios.get(url,config)
    .then((resp)=>{
      console.log(resp.data);
      if(resp){
        this.setState({personas:resp.data.personas})
      }
    })
    .catch((error)=>{
      console.log(error);
      alert("Error");
    })
  }
  
  crearPersona(dataPersona){
    const url= "https://personas.ctpoba.edu.ar/api/personas"
    const data={
      documento: dataPersona.documento,
      apellidos: dataPersona.apellidos,
      nombres: dataPersona.nombres,
      fechaNac: dataPersona.fechaNac,
      telefono: dataPersona.telefono!==""?dataPersona.telefono:null,
      domicilio: dataPersona.domicilio!==""?dataPersona.domicilio:null,
      mail: dataPersona.mail!==""?dataPersona.mail:null,
    }
    const config = {
      headers:{
        authorization: this.state.token
      }
    }

    console.log({config, data})
    axios.post(url,data,config)
    .then((resp)=>{
      this.buscarPersona()
    })
    .catch((error)=> {
      console.log(error);
      alert("error")
    })
  }

  modificarPersona(dataPersona){ 
    const url= "https://personas.ctpoba.edu.ar/api/personas"
    
    const data={
      documento: dataPersona.documento,
      apellidos: dataPersona.apellidos,
      nombres: dataPersona.nombres,
      fechaNac: dataPersona.fechaNac,
      telefono: dataPersona.telefono!==""?dataPersona.telefono:null,
      domicilio: dataPersona.domicilio!==""?dataPersona.domicilio:null,
      mail: dataPersona.mail!==""?dataPersona.mail:null,
    }

    const config={
      params:{
        persona_id:dataPersona.persona_id
      },
      headers:{
        authorization: this.state.token
      }
    }

    axios.put(url,data,config)
    .then((resp)=>{
      this.buscarPersona()
    })
    .catch((error)=>{
      console.log(error);
      alert("Error");
    })
  }

  eliminarPersona(persona_id){
    if(this.state.token!==null){
      const url= "https://personas.ctpoba.edu.ar/api/personas"
      const config={
        headers:{authorization: this.state.token},
        params:{persona_id}
        
      }

      axios.delete(url,config)
      .then((resp)=>{
        this.buscarPersona()
        
      })
      .catch((error)=>{
        console.log(error);
        alert("Error");
      })
    }
  }

  render(){
    const {token, personas, personaModif,varModalCrear, varModalModif, varConfirmModif, varConfirmElim}=this.state
    if(token==null){
      return(
        <div className='App'>
          <div className='DivFormularios'>
            <FormularioCrear
              crear={(user, pass, nombres, apellidos, documento)=>this.crearUsuario(user, pass, nombres, apellidos, documento)}
            />
            <FormularioSesion
              ingresar={(user, pass)=>this.iniciarSesion(user, pass)}
            />  
          </div>
        </div>
      )
    }
    else{
      return(
        <div className="App">
          
          <div className='Todo'>
            {varModalCrear==true&&
              <ModalCrear
                cerrarModal={()=>this.setState({varModalCrear:false})}
                crearPersona={(dataPersona)=>this.crearPersona(dataPersona)}
              />
            }
            {varModalModif==true&&
              <ModalModificar
                persona={personaModif}
                cerrarModal={()=>this.setState({varModalModif:false})}
                modificarPersona={(dataPersona)=>this.modificarPersona(dataPersona)}
              />
            }


            {varConfirmModif==true&&
              <ModalConfirmar cerrarModal={()=>this.setState({varConfirmModif:false})} funcion={()=>this.modificarPersona()}/>
            }
            {varConfirmElim==true&&
              <ModalConfirmar cerrarModal={()=>this.setState({varConfirmElim:false})} funcion={()=>this.eliminarPersona()}/>
            }
          </div>

          <Navbar
            buscarPersona={(valorInput)=>this.buscarPersona(valorInput)}
            mostrarFormCrear={()=>{
              this.setState({varModalCrear:true})
            }}
          />


          <div className='ContenedorPersonas' dir='ltr'>
            {this.state.personas.map((persona, index)=>
              <Persona
                borrarPersona={(persona_id)=>this.eliminarPersona(persona_id)}
                modificar={(dataPersona)=>this.setState({personaModif:dataPersona,varModalModif:true})}
                key={persona._id}
                persona_id={persona._id}
                nombres={persona.nombres} 
                apellidos={persona.apellidos}
                documento={persona.documento}
                domicilio={persona.domicilio}
                fechaNac={persona.fechaNac}
                mail={persona.mail}
                telefono={persona.telefono}
            />
            )}
          </div>
        </div>
      )
    }
  }
}