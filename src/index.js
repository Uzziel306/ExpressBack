/**
 * * BackEnd MAP.
 * * Objetivo: Recibir un archivo xlsx y poder sustraer sus filas para proceder a la validación.
 * * Estado Actual: Recibe un archivo xlsx y lo almacena en forma binaria en el directorio "uploads",
 * se busca eliminar los documentos guardados para no generar espacio en el servidor, pero se 
 * dejara ese objetivo para commits posteriores.
 */

//Inicializadores de dependiancias para nodejs con expressjs.
var express = require('express');
var app = express();
app.listen(3000, () =>{
    console.log("Server running on port: 3000")
});
app.use(express.json());
// Cors para hacer peticiones desde servidores externos.
var cors = require('cors')
app.use(cors())
// multer es la dependencia que nos permite recibir los archivos y guardarlos en forma binaria.
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
//xlsxtojson y xlstojson nos permiten leer el archivo excel fila por fila, y transformandolos en
//un array de objetos con sus respectivos atributos.
var xlsxtojson = require('xlsx-to-json');
var xlstojson = require('xls-to-json');
var xlsxj = require("xlsx-to-json");

//EndPoint home, solo regresa un "Home-Map" para mostrar que funcina el servidor.
app.use(express.json())
app.get("/", (req, res) => {
    console.log("home");
    res.send("Home - MAP");
});

//La petición POST al que mandaremos el archivo xlsx para poder guardar el binario, despues iterar sobre
//las filas y finalmente hacer los "stored procedure" que validarán las celdas.

//dentro del result.foreach ya esta haciendo la iteración por cada objeto, imprimo cada atributo del
//documento que guarde, ahí van los stored procedure ;), por favor cambien los nombres de los 
//atributos por los correspondientes, ya que "living", "car", "house", no son los requeridos en MAP.

//el archivo prueba se llama jeje.xlsx y pueden probarlo directamente mandandolo desde el POST en angular
//o en el objeto xlsxj que esta justo debajo de este comentario, en el atributo input cambiarlo por
//"jeje.xlsx" que se encuentra en la raiz de este proyecto.
app.post("/xlsToJson", upload.single('xmlFile'), (req, res) => {
    xlsxj({
        input: "uploads/" + req.file.filename,
        output: null,
    }, function (err, result) {
        if (err) {
            console.error(err);
            res.json(err);
        } else {
            result.forEach((element, index) => {
                //Iterando a traves del objeto transformado
                console.log("index->" + index);
                console.log("living: " + element['living']);
                console.log("car" + element['car']);
                console.log("house" + element['house']);
            });
            res.json(result);
        }
    });
});

