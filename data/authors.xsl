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
    <xsl:apply-templates>
      <xsl:sort select="birthyear" data-type="number"/>
    </xsl:apply-templates>
  </xsl:template>

</xsl:stylesheet>