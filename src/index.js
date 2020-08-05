import React from 'react';
import ReactDOM from 'react-dom';
import sillonService from './components/services/SillonService';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Sillones from './components/Sillones';

ReactDOM.render(
    <React.StrictMode>
        <Sillones />
    </React.StrictMode>,document.getElementById('root'));

