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
    <title>Contact list</title>
</head>
<body> 
<table id="booksTable">
<tr>
<th>Title</th>
<th>Edition</th>
<th>Authors</th>
</tr>`;

exports.printBooks = function(res) {

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
            
            xml2js.parseString(data, { mergeAttrs: true, explicitArray: false }, (err, result) => {
                if (err) {
                    throw err;
                }  

                content = result;    
            });

            for (let i = 0; i < content.booksCanon.book.length; i++) {
                
                let book = content.booksCanon.book[i];

                let newRow = `<tr><td>${book.title}</td>
                    <td>${book.edition}</td>`;

                if (book.authors.author.length > 1){
                    newRow += '<td>';
                    for (let y = 0; y < book.authors.author.length; y++) {
                        newRow += (`${book.authors.author[y].firstname} ${book.authors.author[y].lastname} <br>`);
                        
                    }
                    newRow += '</td>';
                }
                else {
                    newRow += (`<td>${book.authors.author.firstname} ${book.authors.author.lastname}</td>`);
                }
                
                newRow += '</tr>';
                html += newRow; 
                
            }
                   
            html += `</body> </html>`; 
            res.write(html);
            res.end(); 
        }
        
    });
}