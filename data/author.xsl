<!-- xq424.xsl: converts xq423.xml into xq425.xml -->
<xsl:stylesheet 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns="http://www.w3.org/1999/xhtml"
     version="1.0">

  <xsl:output method="xml"
  indent="yes"
  omit-xml-declaration="no"
  doctype-system="about:legacy-compat"/>

  <xsl:template match="authors">
    <html>
      <body>
        <h1>List of authors: </h1>
        <nav>
            <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/book">Books</a></li>
            </ul>
            <ul>
                    <li><a href="/addAuthor">Create Author</a></li>
            </ul>
        </nav>
          <table border="1" id="tableAuthor">
            <tr>
              <th>Name</th>
              <th>Birthyear</th>
              <th>Deathyear</th>
              <th>Birthplace</th>
              <th>Country</th>
              <th>Language</th>
              <th>Bio</th>
          </tr>

          <xsl:for-each select="author">
            <xsl:sort select="birthyear"/>
            <tr>
                <td><xsl:value-of select="name"/></td>
                <td><xsl:value-of select="birthyear"/></td>
                <td><xsl:value-of select="deathyear"/></td>
                <td><xsl:value-of select="birthplace"/></td>
                <td><xsl:value-of select="country"/></td>
                <td><xsl:value-of select="language"/></td>
                <td><xsl:value-of select="bio"/></td>
            </tr>
        </xsl:for-each>

          </table>
      </body>
    </html>

  </xsl:template>

</xsl:stylesheet>