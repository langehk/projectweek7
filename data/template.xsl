<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns="http://www.w3.org/1999/xhtml">

<xsl:output method="xml"
            indent="yes"
            omit-xml-declaration="no"
            doctype-system="about:legacy-compat"/>

    <xsl:template match="/cars">
        <html>
        <body>
            <table border="1">
                <tr>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Manufacturer</th>
                    <th>Meter</th>
                    <th>Color</th>
                    <th>Price</th>
                    <th>Warrenty</th>
                </tr>
                    <xsl:for-each select="car">
                        <tr>
                            <td><xsl:value-of select="@model"/></td>
                            <td><xsl:value-of select="@year"/></td>
                            <td><xsl:value-of select="@manufacturer"/></td>
                            
                            <td><xsl:value-of select="meter"/></td>
                            <td style="background-color: {color}"><xsl:value-of select="color"/></td>
                            <td><xsl:value-of select="price"/></td>
                                <xsl:for-each select="dealersecurity">
                                    <xsl:if test="@buyback='yes'">
                                      <td>✓</td>
                                    </xsl:if>
                                </xsl:for-each>
                        </tr>
                    </xsl:for-each>
                    <tr>
                        <td colspan="4">Average price</td>
                        <td>DKR</td>
                        
                        <td><xsl:value-of select="sum(car/price) div count(car)"/> </td>
                    </tr>

                </table>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>