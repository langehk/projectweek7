const fs = require("fs").promises;
const querystring = require("querystring"); // parsing and formatting URL query strings
const lib = require("./libWebUtil");
const xml2js = require('xml2js');
const PATH = './data/books.xml';



module.exports = {
    async readBooks(obj) {
        let myKey = obj.POST.isbn;
        let filteredObj;
try {
    let data = await fs.readFile(PATH);
    
        // convert XML data to JSON object
        xml2js.parseString(data, { mergeAttrs: true, explicitArray: false }, (err, result) => {
            if (err) {
                throw err;
            }

        var index = -1;
        filteredObj = result.booksCanon.book.find(function (item, i) {
            if (item.isbn === myKey) {
                index = i;
                return i;
            }
        });
    });
   
    }
    catch(e) {
        console.log("FEJL");

    }
    
return filteredObj;

}};



