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
        this.delete = this.delete.bind(this);
    }

    refreshPage() {
        window.location.reload(false);
      }

    componentDidMount() {
        this.getsillones()
    }

    delete(e) {
        console.log(e.target.id)
        var data = {"data": {"motivo": "Sin definir"}}
        var motivo = prompt("Ingrese Motivo de deshabilitación", "Sin definir")
        if (motivo === null) return
        data.data.motivo = motivo
        
        let deletePromise = sillonService.deleteSillon(e.target.id, data)
        deletePromise.then(res => {
            alert("Sillon deshabilitado")
            this.refreshPage()
        })
         
        console.log(deletePromise)
    }
    getsillones() {
        sillonService.viewAll().then(res => {
            this.setState({ sillones: res.data.map(sillon =>
                <tr class="table">
                    <th>{sillon.id}</th>
                    <td>{sillon.numero_sillon}</td>
                    <td>{sillon.numero_sala}</td>
                    <td>{sillon.fecha_update}</td>
                    <td>{sillon.fecha_creacion}</td>
                    <td>
                        <button class="btn btn-primary">Editar</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" onClick={this.delete} id={sillon.id}>Eliminar</button>
                    </td>

                </tr>)
            })
    })
    }
    render() {

        return <div class="container">
            <div class="card col">
                <table>
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Número Sillón</th>
                    <th scope="col">Número Sala</th>
                    <th scope="col">Ultima actualizacion</th>
                    <th scope="col">Fecha de creación</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.sillones}
                    </tbody>
                </table>

            </div>
        </div>
        
            }
}

export default Sillones;