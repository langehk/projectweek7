/* libWebUtil.js Service Module */
"use strict";

const querystring = require("querystring"); // file system access
const fs = require("fs");
const xml2js = require('xml2js');

const getJSONString = function (obj) {      // prettyprint obj
    return JSON.stringify(obj, null, 4);
}

exports.makeWebArrays = function (req, data) {
    let get = req.url.split("?");
    let qs = "";
    if (get.length === 2) {
        qs = get[1];
    }

    let GET = querystring.parse(qs);
    let POST = querystring.parse(data);
    console.log(getJSONString({ GET, POST }));
    return { GET, POST };
}


/* Skal kunne tage i mod en xml fil, og lave om til JSON
* Kan vi bruge til at indlæse data, udelukkende.
*/
exports.convertXmlToJson = function(file) {

    fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
            throw err;
        }
    xml2js.parseString(data, { mergeAttrs: true, explicitArray: false }, (err, result) => {
        if (err) {
            throw err;
        }
       console.log(JSON.stringify(result, null, 4)); 
        });
    });
}


/*  Skal kunne tage i mod et JSON object, og gemme til en eksisterende XML fil
*   Kan vi bruge til at gemme med....
*/
exports.saveJsonObjectToXml = function(jsonObj, destFile) {
   
    // read XML file
    fs.readFile(destFile, "utf-8", (err, data) => {
        if (err) {
            throw err;
        }

   // convert XML data to JSON object
   xml2js.parseString(data, { mergeAttrs: true, explicitArray: false }, (err, result) => {
    if (err) {
        throw err;
    }

    result.databases.database.push(jsonObj); // HEr pusher vi data ind i vores XML. 
    result.databases.database[1].name = "PostgreSQL."; // Her kan vi opdatere en attribute.

    const builder = new xml2js.Builder();
    const xml = builder.buildObject(result);

    fs.writeFile(destFile, xml, (err) => {
        if (err) {
            throw err;
        }
    });
    });
});
}

exports.createBook = function(object) {

    

    // read XML file
    fs.readFile("./data/books.xml", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }

// Bygger book object, som vi har udfyldt i vores FORM. til et JSON object.
const Book = {
    ref : object.POST.ref,
    title : object.POST.title, 
    edition : object.POST.edition,
    authors : [{
        author: {
            firstname : object.POST.authorFirstname,
            lastname : object.POST.authorFirstname
        },
    }],
    publisher : [{
        name : object.POST.publisherName,
        year : object.POST.publisherYear,
        place : object.POST.publisherPlace,
    }],
    pages : object.POST.pages,
    price : object.POST.price,
    currenct : object.POST.currency,
    comments : [{
        comment : object.POST.comment
    }],
}


    // convert XML data to JSON object
       xml2js.parseString(data, { mergeAttrs: true, explicitArray: false }, (err, result) => {
        if (err) {
            throw err;
        }

        result.booksCanon.book.push(Book);
        console.log(JSON.stringify(result, null, 4));


        // convert SJON objec to XML
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);

        // write updated XML string to a file
        fs.writeFile('./data/books.xml', xml, (err) => {
            if (err) {
                throw err;
            }
        });
    });
});
}
