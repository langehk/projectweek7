"use strict";

const fs = require("fs");
const filename = "./data/authors.xml";
const xml2js = require("xml2js");
const httpStatus = require("http-status-codes"); // http sc
const xsltProcessor = require("xslt-processor"); // http sc
const path = require('path');

exports.printAuthors = function (res) {
    let html = `<!doctype html> 
    <html>
    <head>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="/author.css">
        <title>Authors</title>
    </head>
    <body> 
    <h1>List of authors: </h1>
    <nav>
        <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/book">Books</a></li>
        </ul>
        <ul>
                <li><a href="/addAuthor">Create Author</a></li>
        </ul>
    </nav>
    <div id="containerAuthor">`;

    let content;

    fs.readFile(filename, (err, data) => { //Read file - get our content
        if (err) {
            throw err;

        } else {
            var xsl = fs.readFileSync(path.resolve(__dirname, '../data/authors.xsl'), 'utf-8');
            data = xsltProcessor.xsltProcess(xsltProcessor.xmlParse(data), xsltProcessor.xmlParse(xsl));

            let contentHTML = "text/html; charset=utf-8";
            res.writeHead(httpStatus.OK, { // yes, write header
                "Content-Type": contentHTML
            });

            xml2js.parseString(data, {
                mergeAttrs: true,
                explicitArray: false
            }, (err, result) => { //parse xml to json
                if (err) {
                    throw err;
                }

                content = result;
            });
            for (let i = 0; i < content.authors.author.length; i++) { //our array with objects
                let headline = `<h3>Author</h3>`;
                html += headline;
                for (let key in content.authors.author[i]) { //for each property 
                    let p = `<p><b>${key}</b>: ${content.authors.author[i][key]}</p>`;
                    html += p;
                }
                html += "<hr>";
            }

            html += `</div></body> </html>`;
            res.write(html);
            res.end();
        }

    });
}