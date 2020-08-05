import {api} from './helpers/api.js';
const basePath='sillones';

function viewAll() { return api.get(`${basePath}`); }
function viewSillon(Idsillon) {return api.get(`${basePath}/${Idsillon}`);}
function createSillon(data) {return api.post(`${basePath}`,data); }
function editSillon(Idsillon,data) {return api.put(`${basePath}/${Idsillon}`,data); }
function deleteSillon(Idsillon) {return api.delete(`${basePath}/${Idsillon}/delete`);}

const sillonService={viewAll,viewSillon,createSillon,editSillon,deleteSillon};
export default sillonService;