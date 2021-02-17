/* myTemplater.js Home made experimental templating */
"use strict";

const fs = require("fs");
const querystring = require("querystring"); // parsing and formatting URL query strings
const lib = require("./libWebUtil");
const xml2js = require('xml2js');

exports.receipt = function (obj) {
    let html = `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Sucess</title>
        </head>
        <body>
        <h3>Du har tilføjet:</h3>`;

    for (var propName in obj.POST) { //for each property name in post object 
        let p = (`${propName}: ${obj.POST[propName]}</p>`); //print out data
        html += p;
    }

    html += `</body>
    </html>`;
    return html;
}

exports.deleteReceipt = function (obj) {

    let html = `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Sucess</title>
        </head>
        <body>
        <h3>Du har slettet:</h3>`;

    function printValues(obj) {
        for (var key in obj) {
            if (typeof obj[key] === "object") {
                printValues(obj[key]);
            } else {
                let p = `<p>${[key]}: ${obj[key]}</p>`;
                html += p;
            }
        }
    }

    printValues(obj);

    html += `</body>
    </html>`;
    return html;
}

exports.updateReceipt = function (obj) {

    let html = `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Sucess</title>
        </head>
        <body>
        <h3>Du har opdateret:</h3>`;

    function printValues(obj) {
        for (var key in obj) {
            if (typeof obj[key] === "object") {
                printValues(obj[key]);
            } else {
                let p = `<p>${[key]}: ${obj[key]}</p>`;
                html += p;
            }
        }
    }

    printValues(obj);

    html += `</body>
    </html>`;
    return html;
}



exports.updateBookObj = async function (obj) {
    
    var myKey = obj.POST.isbn; // Key vi søger efter....
   let html = '';
   
    fs.readFile("./data/books.xml", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }
        let filteredObj;
        html = `<!doctype html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Sucess</title>
            </head>
            <body>`;
        // convert XML data to JSON object
        xml2js.parseString(data, { mergeAttrs: true,explicitArray: false }, (err, result) => {
            if (err) {
                throw err;
            }
    
        var index = -1;
        filteredObj = result.booksCanon.book.find(function (item, i) {
            if (item.isbn === myKey) {
                index = i;
                //return i;
            }
        });
    });


    console.log(filteredObj); // Her får vi hentet OBJEKTET, SOM DET SKAL!
                                // MEN ! - Nede i HTML er den undefined.
                                // DETTE HAR GARANTERET, NOGET MED ASYNC AT GØRE?


html += `<form method="POST" action="/updateBook">
                
            <h3>Du søgte efter: ${obj.POST.isbn}</h3>
            <input type="text" name="isbn" placeholder="Enter isbn" value="${filteredObj}" onfocus="this.value = ''" required>
            <input type="submit" name="searchButton" value="Search">
            <h3>Opdater objektet: </h3>
            <input type="text" name="title" placeholder="Enter title" value="${filteredObj}" onfocus="this.value = ''">
            <input type="text" name="edition" placeholder="Enter edition" value="${filteredObj}"  onfocus="this.value = ''">
            <input type="text" name="authorFirstname" placeholder="Enter author firstname" value="${filteredObj}" onfocus="this.value = ''">
            <input type="text" name="authorLastname" placeholder="Enter author lastname" value="${filteredObj}" onfocus="this.value = ''">
            <p>Publisher information:</p>
            <input type="text" name="pubblisherName" placeholder="Enter name" value="${filteredObj}"  onfocus="this.value = ''">
            
            <input type="text" name="publisherYear" placeholder="Enter year" value="${filteredObj}" onfocus="this.value = ''">
            <input type="text" name="publisherPlace" placeholder="Enter placeholder" value="${filteredObj}" onfocus="this.value = ''">
            <input type="number" name="pages" placeholder="Enter number of pages" value="${filteredObj}" onfocus="this.value = ''">
            <input type="number" name="price" placeholder="Enter price" value="${filteredObj}" onfocus="this.value = ''">
            <label for="currency">Choose currency:</label>
                <select name="currency" id="currency">
                <option value="GBP">GBP</option>
                <option value="DKK">DKK</option>
                <option value="US$">US $</option>
                <option value="&#8364;">&#8364;</option>
                </select>
            <input type="text" name="comment" placeholder="Enter comment" value="${filteredObj}" onfocus="this.value = ''" required>        
            <input type="submit" name="updateButton" value="Update book">
        </form>`;
    
    html += `</body></html>`;
});
    return html;

}