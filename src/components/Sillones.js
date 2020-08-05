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
                var obj={id:sillon.id,numero:sillon.numero_sillon};

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
        return <ul> {id}"Separacion"{numero} </ul> ;
         }
}

export default Sillones;