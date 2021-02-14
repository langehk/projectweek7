const lib = require('../private/libWebUtil');


//lib.convertXmlToJson("databases.xml");


const databaseObj =  {
    name : "MSSQL",
    type: "Relation DB"
}

lib.saveJsonObjectToXml(databaseObj, "databases.xml");
