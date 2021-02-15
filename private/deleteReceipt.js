/* myTemplater.js Home made experimental templating */
"use strict";

const fs = require("fs");
const querystring = require("querystring"); // parsing and formatting URL query strings

exports.deleteReceipt = function(obj) {
    let html = `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Sucess</title>
        </head>
        <body>
        <h3>Du har slettet:</h3>`;
     
        for (var propName in obj) { //for each property name in post object 
            let p = (`${propName}: ${obj[propName]}</p>`); //print out data
            html += p;
        }
    
    html += `</body>
    </html>`;
    return html;
}