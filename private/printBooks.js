"use strict";

const fs = require("fs");
const filename = "./data/books.xml";
const xml2js = require("xml2js");
const httpStatus = require("http-status-codes");        // http sc

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

            let html = `<!doctype html> 
            <html>
            <head>
                <meta charset="utf-8"/>
                <title>Contact list</title>
            </head>
            <body> `;
            
            xml2js.parseString(data, { mergeAttrs: true, explicitArray: false }, (err, obj) => {
                if (err) {
                    throw err;
                }
        
                // print JSON object
                //console.log(JSON.stringify(result, null, 4));
                for (let i = 0; i < obj.length; i++) { //our array with objects            
                    for(let key in obj[i]) { //for each property 
                        let p =  `<p><b>${key}</b>: ${obj[i][key]}</p>`;
                        html += p; 
                    }
                }
    
            });


            html += `</body> </html>`; 
            res.write(html);
            res.end();
        }
        
    });
}