const fs = require("fs");

// read XML file
fs.readFile("books.xml", "utf-8", (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
});