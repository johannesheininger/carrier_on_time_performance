const tf = require("@tensorflow/tfjs");
require('@tensorflow/tfjs-node')
const bodyParser = require('body-parser');

const express = require('express');
const fs = require("fs")

const app = express();

var port = process.env.PORT || 8080
var hostname = '127.0.0.1';

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use static folder to deliver front-end
app.use(express.static(__dirname + "/dist"));

let model = null;

function predict(model, predictionInput) {
    var delayed = ["In time", "Delayed"]
    var tt = tf.tensor2d([predictionInput])
    var predictedValue = model.predict(tt).dataSync();
    console.log(predictedValue)
    console.log(delayed[predictedValue.indexOf(Math.max(...predictedValue))])
    return { 
     message: delayed[predictedValue.indexOf(Math.max(...predictedValue))] + ' with a propability of ' + Math.round(predictedValue[predictedValue.indexOf(Math.max(...predictedValue))] * 100) + " %",
     status: delayed[predictedValue.indexOf(Math.max(...predictedValue))]
    }
}

app.post('/check', function (req, res) {
    console.log(req.body)
    //console.log(req.query.measures.split(","))

    var measures = [];
    for (var i in req.body)
        measures.push(req.body[i]);
    console.log(measures)
    // var measures = req.query.measures.split(",");
    if (model != null) {
        var prediction = predict(model, measures)
        // console.log(model)
        console.log(`Prediction: ${prediction.message} ${prediction.status}`)
        res.end(JSON.stringify({
            "message": prediction.message,
            "status": prediction.status
        }));
    } else
        res.end("Modell wurde nicht geladen :-(")
})


//app.listen(9000, () => {
//    console.log('Server started on port 9000!');
    // console.log(tf.version);
//});

app.get("/", function(req, res){
    res.render("index");
})


app.listen(port, function() {
    console.log(`Server/App running at http://${hostname}:${port}/`);
})


/* Das exportierte Modell wird geladen */
async function loadModel() {
    //const fileName = ("./_files/" + "test.html");
    //C:\Users\johannes.heininger\Desktop\Airlines Project\airlines_project\python\index.js
    model = await tf.loadLayersModel('/model/model.json');
}

loadModel().then(() => {
    console.log("Model wurde geladen!")
})