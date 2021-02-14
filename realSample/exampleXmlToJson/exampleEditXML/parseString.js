const fs = require("fs");
const xml2js = require('xml2js');


const book = {
    ref: 'STOR TEST'
}


// read XML file
fs.readFile("books.xml", "utf-8", (err, data) => {
    if (err) {
        throw err;
    }

    // convert XML data to JSON object
    xml2js.parseString(data, { mergeAttrs: true, explicitArray: false }, (err, result) => {
        if (err) {
            throw err;
        }

        result.books.book[2].ref = 'TEEEEESTTTTTT';   // Her kan vi opdatere værdierne.!!!!!

        result.books.book.push(book);
        // print JSON object
        console.log(JSON.stringify(result, null, 4));



        // ---- Her konverterer vi vores JSON, som vi har manipuleret osv, til XML....

        // convert SJON objec to XML
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);

        // write updated XML string to a file
        fs.writeFile('books.xml', xml, (err) => {
            if (err) {
                throw err;
            }
        });
    });
});