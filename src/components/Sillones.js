import './Sillones.css';
import sillonService from './services/SillonService';
import React from 'react';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
class Sillones extends React.Component{
    constructor(props) {
        super(props);
        this.state = {sillones:[]};
    }

    componentDidMount() {
        this.getsillones()
    }
    getsillones() {
        var lista=[];
        sillonService.viewAll().then(res => {
            var lista_sillones=res.data;
            for (var i in lista_sillones){
                var sillon=lista_sillones[i];
                var obj={id:sillon.id,numero:sillon.numero_sillon,sala:sillon.numero_sala,activo:sillon.activo,
                creacion:sillon.fecha_creacion,update:sillon.fecha_update,delete:sillon.fecha_retirado};

                lista.push(obj);
            }
            this.setState({sillones:lista});
            })
    }
    render() {
        var id=this.state.sillones.map((sillon)=>
        <li>{sillon.id}</li>);
        var numero=this.state.sillones.map((sillon)=>
        <li>{sillon.numero}</li>);
        var sala=this.state.sillones.map((sillon)=>
        <li>{sillon.sala}</li>);
        var activo=this.state.sillones.map((sillon)=>
        <li>{sillon.activo}</li>);
        var creacion=this.state.sillones.map((sillon)=>
        <li>{sillon.creacion}</li>);
        var update=this.state.sillones.map((sillon)=>
        <li>{sillon.update}</li>);
        return <ul> IDS{id}NUMEROS de sillon{numero}sala{sala}activo{activo}creacion{creacion}update{update} </ul> ;
         }
}

export default Sillones;