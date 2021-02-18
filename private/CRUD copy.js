const fs = require("fs").promises; // file system access
const xml2js = require("xml2js");
const httpStatus = require("http-status-codes"); // http sc
const receipt = require("./receipts"); // confirmation on added book

let xmlHead = `<?xml version="1.0" standalone="no"?>`; //xml head
let stylesheetAuthor = `<?xml-stylesheet type="text/xsl" href="author.xsl"?>`; //reference to stylesheet
let stylesheetSortAuthor = `<?xml-stylesheet type="text/xsl" href="sortAuthor.xsl"?>`; //reference to stylesheet
let stylesheetBook = `<?xml-stylesheet type="text/xsl" href="books.xsl"?>`; //reference to stylesheet


exports.deleteBook = function (req, res, data) {
    var myId = data.slice(5); // Her fjerner vi "isbn=" fra vores string.

    fs.readFile("./data/books.xml", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }
        xml2js.parseString(data, {
            mergeAttrs: false,
            explicitArray: false
        }, (err, result) => {
            if (err) {
                throw err;
            }

            // Vi starter på index -1.. Hvorefter vi finder item og index, i vores json object.
            // Så ser vi, om vores isbn er lig med vores ID, som er indtastet.
            // Er dette tilfældet, returnerer vi i, som er index på json object.
            // Dette bruges til at slette med....
            var index = -1;
            var filteredObj = result.booksCanon.book.find(function (item, i) {
                if (item.isbn === myId) {
                    index = i;
                    return i;
                }
            });
            var dataToDelete = result.booksCanon.book[index];
            result.booksCanon.book.splice(index, 1); // Her sletter vi alt der er i object index.

            // convert JSON objec to XML
            const builder = new xml2js.Builder();
            var xml = builder.buildObject(result);
            xml = `${xmlHead} \n ${stylesheetBook} \n ${xml}`; //adding head and stylesheet

            // write updated XML string to a file
            fs.writeFile('./data/books.xml', xml, (err) => {
                if (err) {
                    throw err;
                }
            });

            res.writeHead(httpStatus.OK, { // yes, write relevant header
                "Content-Type": "text/html; charset=utf-8"
            });
            res.write(receipt.deleteReceipt(dataToDelete)); 
            res.end();


        });
    });
}

exports.createBook = function (object) {
    // read XML file
    fs.readFile("./data/books.xml", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }
        // Bygger book object, som vi har udfyldt i vores FORM. til et JSON object.
        const Book = {
            ref: object.POST.ref,
            title: object.POST.title,
            edition: object.POST.edition,
            authors: [{
                author: {
                    firstname: object.POST.authorFirstname,
                    lastname: object.POST.authorFirstname
                },
            }],
            publisher: [{
                name: object.POST.publisherName,
                year: object.POST.publisherYear,
                place: object.POST.publisherPlace,
            }],
            pages: object.POST.pages,
            isbn: object.POST.isbn,
            price: object.POST.price,
            currenct: object.POST.currency,
            comments: [{
                comment: object.POST.comment
            }],
        }


        // convert XML data to JSON object
        xml2js.parseString(data, {
            mergeAttrs: false,
            explicitArray: false
        }, (err, result) => {
            if (err) {
                throw err;
            }

            result.booksCanon.book.push(Book); //Pushing our data
            
            // convert JSON objec to XML
            const builder = new xml2js.Builder({headless: true}); //no head
            var xml = builder.buildObject(result);
            xml = `${xmlHead} \n ${stylesheetBook} \n ${xml}`; //adding head and stylesheet

            // write updated XML string to a file
            fs.writeFile('./data/books.xml', xml, (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    });
}

exports.createAuthor = function (object) {
    // read XML file
    fs.readFile("./data/author.xml", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }

        const Author = {
            name: object.POST.name,
            birthyear: object.POST.birthyear,
            deathyear: object.POST.deathyear,
            birthplace: object.POST.birthplace,
            country: object.POST.country,
            language: object.POST.language,
            bio: object.POST.bio
        }

        // convert XML data to JSON object
        xml2js.parseString(data, (err, result) => {
            if (err) {
                throw err;
            }

            result.authors.author.push(Author);

            // convert SJON objec to XML
            const builder = new xml2js.Builder();
            var xml = builder.buildObject(result);
            xml = `${xmlHead} \n ${stylesheetAuthor} \n ${xml}`; //adding head and stylesheet

            // write updated XML string to a file
            fs.writeFile('./data/author.xml', xml, (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    });
}

exports.updateBook = function(object){
   
    var lookupKey = object.POST.isbn;

    fs.readFile("./data/books.xml", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }

    const Book = {
        ref: object.POST.ref,
        title: object.POST.title,
        edition: object.POST.edition,
        authors: [{
            author: {
                firstname: object.POST.authorFirstname,
                lastname: object.POST.authorFirstname
            },
        }],
        publisher: [{
            name: object.POST.publisherName,
            year: object.POST.publisherYear,
            place: object.POST.publisherPlace,
        }],
        pages: object.POST.pages,
        isbn: object.POST.isbn,
        price: object.POST.price,
        currenct: object.POST.currency,
        comments: [{
            comment: object.POST.comment
        }],
    }
        // convert XML data to JSON object
        xml2js.parseString(data, { mergeAttrs: true,explicitArray: false }, (err, result) => {
            if (err) {
                throw err;
            }
            
            // Vi starter på index -1.. Hvorefter vi finder item og index, i vores json object.
            // Så ser vi, om vores isbn er lig med vores ID, som er indtastet.
            // Er dette tilfældet, returnerer vi i, som er index på json object.
            // Dette bruges til at slette med....
            var index = -1;
            result.booksCanon.book.find(function (item, i) {
                if (item.isbn === lookupKey) {
                    index = i;
                    return i;
                }
            });

            var bookToUpdate = result.booksCanon.book[index];
            result.booksCanon.book.splice(index, 1); // Her sletter vi alt der er i object index. (Som allerede eksisterer)
            result.booksCanon.book.push(Book); // Her pusher vi det nye objekt ind i vores XML fil..
            
            // convert JSON objec to XML
            const builder = new xml2js.Builder();
            var xml = builder.buildObject(result);
            xml = `${xmlHead} \n ${stylesheetBook} \n ${xml}`; //adding head and stylesheet

            // write updated XML string to a file
            fs.writeFile('./data/books.xml', xml, (err) => {
                if (err) {
                    throw err;
                }
            });
            return bookToUpdate;
        });
    });
}

