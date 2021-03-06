"use strict";
/*
 * check if routed handler function exists
 * if yes call it, else complain
 */
const handlers = require("../private/handlers");               // handlers module
const requestHandlers = {                             // application urls here
    GET: {
        "/": handlers.home,
        "/addBook": handlers.home,
        "/deleteBook" : handlers.home,
        "/deleteAuthor" : handlers.home,
        "/updateBook" : handlers.home,
        "/updateAuthor" : handlers.home,
        "/addAuthor": handlers.home,
        "/book" : handlers.books,
        "/author" : handlers.xml,
        "/sortAuthor" : handlers.xml,
        "/notfound": handlers.notfound,
        "js": handlers.js,
        "css": handlers.css,
        "png": handlers.png,
        "ico": handlers.ico,
        "xsl": handlers.xsl
    },
    POST: {
        "/addBook": handlers.POSTBook,
        "/deleteBook" : handlers.deleteBook,
        "/updateBook" : handlers.updateBook,
        "/searchForBook" : handlers.searchForBook,
        "/addAuthor": handlers.POSTAuthor,
        "/deleteAuthor": handlers.deleteAuthor,
        "/updateAuthor" : handlers.updateAuthor
    }
}

module.exports = {
    route(req, res, bodydata) {
        let arr = req.url.split(".");
        let ext = arr[arr.length - 1];
        if (typeof requestHandlers[req.method][req.url] === 'function') {  // look for route
            requestHandlers[req.method][req.url](req, res, bodydata);      // if found use it
        } else if (typeof requestHandlers[req.method][ext] === "function") {
            requestHandlers[req.method][ext](req, res);
        } else {
            requestHandlers.GET["/notfound"](req, res);        // use notfound
        }
    }
}
