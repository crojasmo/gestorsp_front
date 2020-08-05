import './Sillones.css';
import sillonService from './services/SillonService';
import React from 'react';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
class Sillones extends React.Component{

    getsillones() {
        const sillones = sillonService.viewAll().then(res => {
            return res.data})
        console.log(sillones)
        const list = sillones.map(sillon => 
            <li>{sillon.id}</li>)
        return list
    }

    render() {return <ul>{this.getsillones()}</ul>}
}

export default Sillones;