import './Sillones.css';
import sillonService from './services/SillonService';
import React from 'react';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
class Sillones extends React.Component{
    constructor(props) {
        super(props);
        this.state = {sillones: []};
      }

    componentDidMount() {
        this.getsillones()
    }
    getsillones() {
        sillonService.viewAll().then(res => {
            this.setState({ sillones: res.data.map(sillon =>
                <li>{[sillon.id,sillon.numero_sillon,sillon.activo,sillon.numero_sala,sillon.fecha_update,sillon.fecha_creacion,sillon.fecha_retirado]}</li>)
            })
        })
    }

    render() {

        return <ul>{
        this.state.sillones}</ul>}
}

export default Sillones;