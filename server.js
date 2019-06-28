var static = require('node-static');
var fs = require('fs');
var express = require('express');
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.post("/submit", urlencodedParser, function (request, response) {
  if(!request.body) return response.sendStatus(400);
    let logData = `
    name: ${request.body.name},
    email: ${request.body.email},
    subject: ${request.body.subject},
    message: ${request.body.message} \n`; 
    
    let previousContent = fs.readFileSync('log.txt', 'utf8');
    previousContent += logData;
    fs.writeFile('log.txt', previousContent, function(err, data){}); 
    response.send(`The form is submited successfully! Check your ${request.body.email} email-box`);
  });

app.use(express.static('public'))
app.listen(8080);
