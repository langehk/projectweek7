'use strict';
/*
 * handlers.js
 * Requesthandlers to be called by the router mechanism
 */
const fs = require("fs");                               // file system access
const xml2js = require("xml2js");
const httpStatus = require("http-status-codes");        // http sc
const lib = require("../private/libWebUtil");           // home grown utilities
const receipt = require("./receipts"); // confirmation on added book
const print = require("../private/printBooks"); 
const printAuthors = require("../private/printAuthors"); 
const deleteReceipt = require("../private/deleteReceipt");

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
const getAndServe = async function (res, path, content) {   // asynchronous
    await fs.readFile(path, function(err, data) {           // awaits async read
        if (err) {
            console.log(`Not found file: ${path}`);
        } else {
            res.writeHead(httpStatus.OK, {          // yes, write header
                "Content-Type": content
            });
            console.log(`served routed file: ${path}.`);
            res.write(data);
            res.end();
        }
    });
}

module.exports = {
    home(req, res) {
        let path = req.url;
        if (path === "/" || path === "/start") {
            path = "/index";
        }
        path = "views" + path + ".html";
        let content = "text/html; charset=utf-8";
        getAndServe(res, path, content);
    },
    js(req, res) {
        let path = "public/javascripts" + req.url;
        let content = "application/javascript; charset=utf-8";
        getAndServe(res, path, content);
    },
    css(req, res) {
        let path = "public/stylesheets" + req.url;
        let content = "text/css; charset=utf-8";
        getAndServe(res, path, content);
    },
    png(req, res) {
        let path = "public/images" + req.url;
        let content = "image/png";
        getAndServe(res, path, content);
    },
    ico(req, res) {
        let path = "public" + req.url;
        let content = "image/x-icon";
        getAndServe(res, path, content);
    },
    xsl(req, res) {
        let path = "data/" + req.url;
        let content = "text/xsl; charset=utf-8";
        console.log("xsl");
        getAndServe(res, path, content);
    },
    notfound(req, res) {
        console.log(`Handler 'notfound' was called for route ${req.url}`);
        res.end();
    },
    books(req, res) {
        print.printBooks(res);
    },
    authors(req, res) {
        printAuthors.printAuthors(res);
    },
    receiveData(req, res, data) {

        let obj = lib.makeWebArrays(req, data);         // home made GET and POST objects
        res.writeHead(httpStatus.OK, {                  // yes, write relevant header
            "Content-Type": "text/html; charset=utf-8"
        });
        res.write(receipt.receipt(obj));           // home made templating for native node
        res.end();
    },
    POSTBook(req, res, data) {
        let obj = lib.makeWebArrays(req, data);
        res.writeHead(httpStatus.OK, {                  // yes, write relevant header
            "Content-Type": "text/html; charset=utf-8"
        });
        lib.createBook(obj);
        res.write(receipt.receipt(obj));           // home made templating for native node
        res.end();
    },
    deleteBook(req, res, data){
        var myId = data.toString();  // Her henter vi dataen vi indtaster, som vi vil søge efter.
        //var myId = 'isbn=978-063456457542';
        //result.booksCanon.book
        myId = myId.slice(5);  // Her fjerner vi "isbn=" fra vores string.

        /*let regex = new RegExp('[^=]*$');
        regex.test(myId);*/
        
        
        fs.readFile("./data/books.xml", "utf-8", (err, data) => {
            if (err) {
                throw err;
            }
        xml2js.parseString(data, { mergeAttrs: true, explicitArray: false }, (err, result) => {
            if (err) {
                throw err;
            }

        console.log(JSON.stringify(result, null, 4));
        
        
        // Vi starter på index -1.. Hvorefter vi finder item og index, i vores json object.
        // Så ser vi, om vores isbn er lig med vores ID, som er indtastet.
        // Er dette tilfældet, returnerer vi i, som er index på json object.
        // Dette bruges til at slette med....
        var index = -1;
        var filteredObj = result.booksCanon.book.find(function(item, i){
            if(item.isbn === myId){
                index = i;
                return i;
            }
        });
        var dataToDelete = result.booksCanon.book[index];  
        console.log(dataToDelete);
        //console.log(result.booksCanon.book[5]); // Her tager vi fat i den sidst fx.
        result.booksCanon.book.splice(index, 1); // Her sletter vi alt der er i object index.

        // convert SJON objec to XML
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);

        // write updated XML string to a file
        fs.writeFile('./data/books.xml', xml, (err) => {
            if (err) {
                throw err;
            }
        });

        res.writeHead(httpStatus.OK, {                  // yes, write relevant header
            "Content-Type": "text/html; charset=utf-8"
        });
        res.write(deleteReceipt.deleteReceipt(dataToDelete));           // home made templating for native node
        res.end();
    });
});
    },
    updateBook(req, res, data){

    },
    POSTAuthor(req, res, data) {
        let obj = lib.makeWebArrays(req, data);
        res.writeHead(httpStatus.OK, {                  // yes, write relevant header
            "Content-Type": "text/html; charset=utf-8"
        });
        lib.createAuthor(obj);
        res.write(receipt.receipt(obj));           // home made templating for native node
        res.end();
    },
    deleteAuthor(req, res, data){
        
    },
    updateAuthor(req, res, data){

    }

}
