//Importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');
const db = require('./config/database');

require('dotenv').config({ path: 'variables.env' })

//Configurar express
const app = express();

//Habilitar pug
app.set('view engine','pug');

//Añadir las vistas
app.set('views', path.join(__dirname, './views'));

//cargar una carpeta estatica llamada public
app.use(express.static('public'));

//Validar si estamos en desarrollo o en producción
const config = configs[app.get('env')];

//Creamos la variable para el sitio eweb
app.locals.titulo = config.nombresitio;

//Muestra el año actual
app.use((req,res,next) =>{
    //Crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    //muestra la ruta actual
    res.locals.ruta = req.path;
    //console.log(res.locals);
    return next();
})

//ejecutar el body-parser
app.use(bodyParser.urlencoded({extended: true}));

//cargar las rutas
app.use('/',routes());

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor está funcionando...')
});