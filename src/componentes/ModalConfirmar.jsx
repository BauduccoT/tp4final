import { Component } from 'react';

export default class ModalConfirmar extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div className='ModalConfirmar'>
                <h2>¿Está seguro que quiere confirmar los cambios?</h2>
                <button onClick={()=>this.props.funcion()}>Si</button>
                <button onClick={()=>this.props.cerrarModal()}>No</button>
            </div>
        )
    }
}