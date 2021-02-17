/* myTemplater.js Home made experimental templating */
"use strict";

exports.htmltop = function (filteredObj) {

    let html = `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Sucess</title>
        </head>
        <body>
        <form method="POST" action="/updateBook">
                
        <h3>Du søgte efter: ${filteredObj.isbn}</h3>
        <input type="text" name="isbn" placeholder="Enter isbn" value="${filteredObj.isbn}" onfocus="this.value = ''" required>
        <input type="submit" name="searchButton" value="Search">
        <h3>Opdater objektet: </h3>
        <input type="text" name="title" placeholder="Enter title" value="${filteredObj.title}" onfocus="this.value = ''">
        <input type="text" name="edition" placeholder="Enter edition" value="${filteredObj.edition}"  onfocus="this.value = ''">
        <input type="text" name="authorFirstname" placeholder="Enter author firstname" value="${filteredObj.authors.author[0].firstname}" onfocus="this.value = ''">
        <input type="text" name="authorLastname" placeholder="Enter author lastname" value="${filteredObj.authors.author[0].lastname}" onfocus="this.value = ''">
        <p>Publisher information:</p>
        <input type="text" name="pubblisherName" placeholder="Enter name" value="${filteredObj.publisher.name}"  onfocus="this.value = ''">
        
        <input type="text" name="publisherYear" placeholder="Enter year" value="${filteredObj.publisher.year}" onfocus="this.value = ''">
        <input type="text" name="publisherPlace" placeholder="Enter placeholder" value="${filteredObj.publisher.place}" onfocus="this.value = ''">
        <input type="number" name="pages" placeholder="Enter number of pages" value="${filteredObj.pages}" onfocus="this.value = ''">
        <input type="number" name="price" placeholder="Enter price" value="${filteredObj.price}" onfocus="this.value = ''">
        <label for="currency">Choose currency:</label>
            <select name="currency" id="currency">
            <option value="GBP">GBP</option>
            <option value="DKK">DKK</option>
            <option value="US$">US $</option>
            <option value="&#8364;">&#8364;</option>
            </select>
        <input type="text" name="comment" placeholder="Enter comment" value="${filteredObj.comments.comment}" onfocus="this.value = ''" required>        
        <input type="submit" name="updateButton" value="Update book">
    </form>
    </body>
    </html>`;

    return html;
};