"use strict";

const fs = require("fs");
const filename = "./data/books.xml";
const xml2js = require("xml2js");
const httpStatus = require("http-status-codes");        // http sc

let p; 
let html = `<!doctype html> 
<html>
<head>
    <meta charset="utf-8"/>
    <title>Authors</title>
</head>
<body> 
<h1>List of authors: </h1>
<nav>
      <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/author">Author</a></li>
      </ul>
</nav>`;

exports.printAuthors = function(res) {

    let content; 

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
            
            xml2js.parseString(data, { mergeAttrs: true, explicitArray: false }, (err, result) => { //parse xml to json
                if (err) {
                    throw err;
                }  

                content = result;    
            });

            for (let i = 0; i < content.authors.length; i++) { //our array with objects
                console.log("hej");            
                for(let key in content[i]) { //for each property 
                    let p =  `<p><b>${key}</b>: ${content[i][key]}</p>`;
                    html += p; 
                }
            }
                   
            html += `</body> </html>`; 
            res.write(html);
            res.end(); 
        }
        
    });
}