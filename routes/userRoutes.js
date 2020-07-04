const express = require('express'); 
const userController = require('../controllers/UserController'); 
const api = express.Router(); 

/**
 * POST: insertar datos
 * GET: Para obtener datos
 * PUT: Modificar datos 
 * DELETE: Eliminar datos 
 */

api.get('/saludo', (req, res) => {
    res.send('Hola a todos');
}); 

api.post('/', userController.create); 

api.get('/', userController.list);

api.put('/:id', userController.update);

api.delete('/:id', userController.remove);

api.post('/login', userController.login); 

module.exports = api; 