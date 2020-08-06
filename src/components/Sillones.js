import './Sillones.css';
import sillonService from './services/SillonService';
import React from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
class Sillones extends React.Component{
    constructor(props) {
        super(props);
        this.state = {sillones:[], editDetails: {}, addDetails: {}, addModal: false, editModal:false};
        this.delete = this.delete.bind(this);
        this.toogleAddModal = this.toogleAddModal.bind(this);
        this.toogleEditModal = this.toogleEditModal.bind(this);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.loadSillonDetails = this.loadSillonDetails.bind(this);
        this.addSillon = this.addSillon.bind(this);
        this.editSillon = this.editSillon.bind(this);

    }
    
    refreshPage() {
        window.location.reload(false);
    }
    
    handleAddChange(event){
        const target = event.target;
        this.setState(prevState => ({
            addDetails: {
                ...prevState.addDetails,
                 [target.id]: target.value}
        }));
    }
    handleEditChange(event) {
        const target = event.target;
        console.log(this.state.editDetails)
        this.setState(prevState => ({
            editDetails: {
                ...prevState.editDetails,
                 [target.id]: target.value}
        }))
        console.log(this.state.editDetails)
    }

    loadSillonDetails(e) {
        let id = e.target.getAttribute('data')
        let ss = sillonService.viewSillon(id)
        console.log(ss)
        ss.then(res => {
            this.setState({editDetails: res.data})
        })
        this.toogleEditModal()
    }
    toogleAddModal() {
        this.setState({addModal: !this.state.addModal})
    }    
    toogleEditModal() {
        this.setState({editModal: !this.state.editModal})
    }
    
    componentDidMount() {
        this.getsillones()
    }
    
    addSillon(e) {
        e.preventDefault();
        let data = {...this.state.addDetails}
        data['activo'] = true
        console.log(data)
        let ss = sillonService.createSillon(data)
        console.log(ss)
        this.toogleAddModal()
    }
    editSillon(e) {
        e.preventDefault();
        let data = {...this.state.editDetails}
        delete data["id"]
        delete data["fecha_creacion"]
        delete data["fecha_update"]
        delete data["fecha_retirado"]
        console.log(data)
        let ss = sillonService.editSillon(this.state.editDetails.id, data)
        console.log(ss)
        ss.then(res => {
            let data = res.data
            
            let newState = this.state.sillones.map(sillon => {
                console.log(sillon.id, this.state.editDetails.id)
                if (sillon.id === this.state.editDetails.id) {
                    console.log("cambio")
                    return <>
                        <tr key={data.id}>
                            <th>{data.id}</th>
                            <td>{data.numero_sillon}</td>
                            <td>{data.numero_sala}</td>
                            <td>{data.fecha_update}</td>
                            <td>{data.fecha_creacion}</td>
                            <td>
                                <Button variant="primary" onClick={this.loadSillonDetails} data={sillon.id}>Editar</Button>
                            </td>
                            <td>
                                <Button variant="danger" onClick={this.delete} data={sillon.id}>Eliminar</Button>
                            </td>
                            
                        </tr>)
                    </>
                }
                return sillon
            })
            this.setState({sillones: newState})
        })

        this.toogleEditModal()
    }
    
    delete(e) {
        console.log(e.target)
        var data = {"data": {"motivo": "Sin definir"}}
        var motivo = prompt("Ingrese Motivo de deshabilitación", "Sin definir")
        if (motivo === null) return
        data.data.motivo = motivo
        
        let deletePromise = sillonService.deleteSillon(e.target.getAttribute('data'), data)
        deletePromise.then(res => {
            alert("Sillon deshabilitado")
            this.refreshPage()
        })
        
        console.log(deletePromise)
    }
    getsillones() {
        sillonService.viewAll().then(res => {
            this.setState({ sillones: res.data.map(sillon =>
                <tr key={sillon.id}>
                <th>{sillon.id}</th>
                <td>{sillon.numero_sillon}</td>
                <td>{sillon.numero_sala}</td>
                <td>{sillon.fecha_update}</td>
                <td>{sillon.fecha_creacion}</td>
                <td>
                <Button variant="primary" onClick={this.loadSillonDetails} data={sillon.id}>Editar</Button>
                </td>
                <td>
                <Button variant="danger" onClick={this.delete} data={sillon.id}>Eliminar</Button>
                </td>
                
                </tr>)
            })
        })
    }

    render() {
        
        return <> 
        <Modal show={this.state.addModal} onHide={this.toogleAddModal}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Sillón</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.addSillon}>
                <Modal.Body>
                    <Form.Group controlId="numero_sillon">
                        <Form.Label>Número sillón</Form.Label>
                        <Form.Control type="number"  placeholder="Ingresa Número sillón" onChange={this.handleAddChange}/>
                    </Form.Group>
                    <Form.Group controlId="numero_sala">
                        <Form.Label>Sala del sillón</Form.Label>
                        <Form.Control placeholder="Ingresa Sala del sillón" onChange={this.handleAddChange} />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toogleAddModal}>
                    Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                    Crear sillón
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal> 
        <Modal show={this.state.editModal} onHide={this.toogleEditModal}>
        <Modal.Header closeButton>
        <Modal.Title>Editar Sillón</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.editSillon} >
        <Modal.Body>
        <Form.Group controlId="numero_sillon">
        <Form.Label>Número sillón</Form.Label>
        <Form.Control type="number" value={this.state.editDetails.numero_sillon} placeholder="Ingresa Número sillón" onChange={this.handleEditChange} />
        </Form.Group>
        <Form.Group controlId="numero_sala">
        <Form.Label>Sala del sillón</Form.Label>
        <Form.Control value={this.state.editDetails.numero_sala} placeholder="Ingresa Sala del sillón" onChange={this.handleEditChange} />
        </Form.Group>
        
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.toogleEditModal}>
        Cancelar
        </Button>
        <Button variant="primary" type="submit">
        Guardar cambios
        </Button>
        </Modal.Footer>
        </Form>
        </Modal> 
        <div className="container">
        <div className="card col">
        <Button variant="primary" onClick={this.toogleAddModal}>Agregar Sillón</Button>
        <Table>
            <thead>
                <tr>
                <th>Id</th>
                <th>Número Sillón</th>
                <th>Número Sala</th>
                <th>Ultima actualizacion</th>
                <th>Fecha de creación</th>
                </tr>
            </thead>
            <tbody>
                {this.state.sillones}
            </tbody>
        </Table>
        
        </div>
        </div>
        </>
    }
}

export default Sillones;