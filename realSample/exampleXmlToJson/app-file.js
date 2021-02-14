const xml2js = require('xml2js');
const fs = require('fs');

// read XML from a file
const xml = fs.readFileSync('books.xml');

// convert XML to JSON
xml2js.parseString(xml, { mergeAttrs: true, explicitArray: false }, (err, result) => {
    if (err) {
        throw err;
    }

    // `result` is a JavaScript object
    // convert it to a JSON string
    const json = JSON.stringify(result, null, 4);   // Her har vi det korrekte JSON data!

    // save JSON in a file
    fs.writeFileSync('user.json', json);

}); 