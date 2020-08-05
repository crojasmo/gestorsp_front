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
            this.setState({ sillones: res.data.map(sillon =>
                <tr class="table">
                    <th>{sillon.id}</th>
                    <td>{sillon.numero_sillon}</td>
                    <td>{sillon.activo}</td>
                    <td>{sillon.numero_sala}</td>
                    <td>{sillon.fecha_update}</td>
                    <td>{sillon.fecha_creacion}</td>
                    <td>{sillon.fecha_retirado}</td>
                </tr>)
            })
    })
    }
    render() {

        return <table>
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Número Sillón</th>
                <th scope="col">Esta activo</th>
                <th scope="col">Número Sala</th>
                <th scope="col">Ultima actualizacion</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de desactivación</th>
            </tr>
            </thead>
            <tbody>
                {this.state.sillones}
                </tbody>
            </table>}
}

export default Sillones;