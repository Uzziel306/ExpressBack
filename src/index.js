var express = require('express');
var cors = require('cors')
var app = express();
var xlsxtojson = require('xlsx-to-json');
var xlstojson = require('xls-to-json');
xlsxj = require("xlsx-to-json");
app.use(cors())


    app.use(express.static(__dirname +  '/public'));
    app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

    app.get("/", (req, res)=>{
        console.log("home");
        
        res.send("Oki");
    } );

    app.post("/xlsToJson", (req, res) =>{
        xlsxj({
            input: "hoja.xlsx", 
            output: "output.json"
          }, function(err, result) {
            if(err) {
              console.error(err);
              res.json(err);
            }else {
              console.log(result);
              res.json(result);
            }
          });
    });
app.listen(3000);
