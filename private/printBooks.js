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
<body> 
<table id="booksTable">
<tr>
<th>Title</th>
<th>Edition</th>
<th>Authors</th>`; 

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
                
                let author = content.booksCanon.book;

                let newRow = `<tr><td>${content.booksCanon.book[i].title}</td>
                    <td>${content.booksCanon.book[i].edition}</td>
                    <td>${content.booksCanon.book[i].authors.author.firstname} ${content.booksCanon.book[i].authors.author.lastname}</td></tr>`;
                html += newRow; 
                
            }
            
            html += `</body> </html>`; 
            res.write(html);
            res.end(); 
        }
        
    });
}