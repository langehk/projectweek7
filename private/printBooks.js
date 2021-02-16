"use strict";

const fs = require("fs");
const filename = "./data/books.xml";
const xml2js = require("xml2js");
const httpStatus = require("http-status-codes");        // http sc

exports.printBooks = function(res) {
    let html = `<!doctype html> 
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>Books</title>
    </head>
    <body> 
    <h1>List of books: </h1>
    <nav>
        <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/author">Author</a></li>
        </ul>
        <ul>
                <li><a href="/addBook">Create Book</a></li>
                <li><a href="/deleteBook">Delete Book</a></li>
                <li><a href="/updateBook">Update Book</a></li>
        </ul>
    </nav>
    <table id="booksTable" border="1">
        <tr>
            <th>Title</th>
            <th>Edition</th>
            <th>Authors</th>
            <th>Publisher</th>
            <th>Pages</th>
            <th>Isbn</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Comments</th>
        </tr>`;

    let content = ""; 

    fs.readFile(filename, (err, data) => { //Read file - get our content
        if (err) {
            throw err;
            
        } 
        else 
        {
            let contentHTML = "text/html; charset=utf-8";
            res.writeHead(httpStatus.OK, {          // yes, write header
                "Content-Type": contentHTML
            });
            
            xml2js.parseString(data, { mergeAttrs: true, explicitArray: false }, (err, result) => { //parse xml to json
                if (err) {
                    throw err;
                }  

                content = result;    
            });

            for (let i = 0; i < content.booksCanon.book.length; i++) { //as many books as we have
                
                let book = content.booksCanon.book[i]; 

                let newRow = `<tr><td>${book.title}</td>
                    <td>${book.edition}</td>`; //building new row

                // Henter author / authors 
                if (book.authors.author.length > 1){ //more than one author
                    newRow += '<td>';
                    for (let y = 0; y < book.authors.author.length; y++) {
                        newRow += (`${book.authors.author[y].firstname} ${book.authors.author[y].lastname} <br>`);
                        
                    }
                    newRow += '</td>';
                }
                else {
                    newRow += (`<td>${book.authors.author.firstname} ${book.authors.author.lastname}</td>`);
                }

                newRow += (`<td>${book.publisher.name} ${book.publisher.year} <br> ${book.publisher.place}</td>`);
                newRow += (`<td>${book.pages}`);
                newRow += (`<td>${book.isbn}`);
                newRow += (`<td>${book.price}`);
                newRow += (`<td>${book.currency}`);

                if(book.comments.comment.length > 1){ //more than one comment
                    newRow += '<td>';
                    for (let y = 0; y < book.comments.comment.length; y++) {
                        newRow += (`${book.comments.comment[y]}`);
                        
                    }
                    newRow += '</td>';
                }
                else {
                    newRow += (`<td>${book.comments.comment[y]}</td>`);
                }
                

                let tabledata = newRow + '</tr>';
                html += tabledata; 

            }
                   
            html += `</table></body> </html>`; 
            res.write(html);
            res.end(); 
        }
        
    });
}