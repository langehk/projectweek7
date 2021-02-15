"use strict";

const fs = require("fs");
const filename = "./data/books.xml";
const xml2js = require("xml2js");
const httpStatus = require("http-status-codes");        // http sc

let html = `<!doctype html> 
<html>
<head>
    <meta charset="utf-8"/>
    <title>Contact list</title>
</head>
<body> `; 

const printObjects = function(obj) {   
    for (var key in obj) {
        if (typeof obj[key] === "object") {
            let pp = `<p>${key}</p>`;
            html += pp;
            printObjects(obj[key]);   
        } else {
            let p =  `<p><b>${key}</b>: ${obj[key]}</p>`;
            html += p;   
        }
    }
}

exports.printBooks = function(res) {

    fs.readFile(filename, (err, data) => { //Read file - get our content
        if (err) {
            throw err;
            
        } 
        else 
        {
            let content = "text/html; charset=utf-8";
            res.writeHead(httpStatus.OK, {          // yes, write header
                "Content-Type": content
            });
            
            xml2js.parseString(data, { mergeAttrs: true, explicitArray: false }, (err, result) => {
                if (err) {
                    throw err;
                }

                printObjects(result.booksCanon.book);      
   
            });

            html += `</body> </html>`; 
            res.write(html);
            res.end(); 
        }
        
    });
}