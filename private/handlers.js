'use strict';
/*
 * handlers.js
 * Requesthandlers to be called by the router mechanism
 */
const fs = require("fs"); // file system access
const xml2js = require("xml2js");
const httpStatus = require("http-status-codes"); // http sc
const lib = require("../private/libWebUtil"); // home grown utilities
const receipt = require("./receipts"); // confirmation on added book
const print = require("../private/printBooks");
const CRUD = require("../private/CRUD");
const mod =  require("../private/jsonBooks");
const tmpl =  require("./myTemplater");

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
const getAndServe = async function (res, path, content) { // asynchronous
    await fs.readFile(path, function (err, data) { // awaits async read
        if (err) {
            console.log(`Not found file: ${path}`);
        } else {
            res.writeHead(httpStatus.OK, { // yes, write header
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
    xml(req, res) {
        let path = "data" + req.url + ".xml";
        let content = "text/xml; charset=utf-8";
        getAndServe(res, path, content);
    },
    xsl(req, res) {
        let path = "data" + req.url;
        let content = "text/xsl; charset=utf-8";
        getAndServe(res, path, content);
    },
    notfound(req, res) {
        console.log(`Handler 'notfound' was called for route ${req.url}`);
        res.end();
    },
    books(req, res) {
        print.printBooks(res);
    },
    receiveData(req, res, data) {
        let obj = lib.makeWebArrays(req, data); // home made GET and POST objects
        res.writeHead(httpStatus.OK, { // yes, write relevant header
            "Content-Type": "text/html; charset=utf-8"
        });
        res.write(receipt.receipt(obj)); // home made templating for native node
        res.end();
    },
    POSTBook(req, res, data) {
        let obj = lib.makeWebArrays(req, data);
        res.writeHead(httpStatus.OK, { // yes, write relevant header
            "Content-Type": "text/html; charset=utf-8"
        });
        CRUD.createBook(obj);
        res.write(receipt.receipt(obj)); // home made templating for native node
        res.end();
    },
    deleteBook(req, res, data) {
        CRUD.deleteBook(req, res, data);
    },
    updateBook(req, res, data) {
        let obj = lib.makeWebArrays(req, data);
        
        res.writeHead(httpStatus.OK, { // yes, write relevant header
            "Content-Type": "text/html; charset=utf-8"
        });
        res.write(receipt.updateReceipt(CRUD.updateBook(obj))); 
        res.end();
    },
    searchForBook(req, res, data){
        let obj = lib.makeWebArrays(req, data);
        mod.readBooks(obj)
        .then( function (contacts) {
            res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                "Content-Type": "text/html; charset=utf-8"
            });
            
            res.write(tmpl.htmltop(contacts));                                   // home made templating for native node
            res.end();
        })
        .catch( function (err) {
            console.log(err)
        })


        /*let obj = lib.makeWebArrays(req, data);
        res.writeHead(httpStatus.OK, { // yes, write relevant header
            "Content-Type": "text/html; charset=utf-8"
        });
        res.write(receipt.updateBookObj(obj)); 
        res.end();*/
    },
    POSTAuthor(req, res, data) {
        let obj = lib.makeWebArrays(req, data);
        res.writeHead(httpStatus.OK, { // yes, write relevant header
            "Content-Type": "text/html; charset=utf-8"
        });
        CRUD.createAuthor(obj);
        res.write(receipt.receipt(obj)); // home made templating for native node
        res.end();
    },
    deleteAuthor(req, res, data) {

    },
    updateAuthor(req, res, data) {

    }

}