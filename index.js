const mongoose = require('mongoose'); 
const app = require('./app.js')
const port = 3000; 

mongoose.connect('mongodb://localhost:27017/eduBIT', { useNewUrlParser: true, useUnifiedTopology: true }, (error, res) => {
    if(error){
        console.error('Error de conexión', error);
    }else{
        console.log('Nos conectamos bien');
        app.listen( port, () => {
            console.log('Estamos escuchando en el puerto', port);
        } )
    }
}); 