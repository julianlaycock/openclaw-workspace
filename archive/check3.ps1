$en = (Invoke-WebRequest 'http://localhost:3000/api/landing' -UseBasicParsing).Content
$de = (Invoke-WebRequest 'http://localhost:3000/api/landing?lang=de' -UseBasicParsing).Content
"EN page:"
"  has lang-bar: $($en.Contains('lang-bar'))"
"  has DE link: $($en.Contains('lang=de'))"
"  EN is active: $($en.Contains('<a href=`"/api/landing`" class=`"active`">EN</a>'))"
"  is English: $($en.Contains('Fund compliance'))"
""
"DE page:"
"  has lang-bar: $($de.Contains('lang-bar'))"
"  has EN link: $($de.Contains('lang=en'))"
"  DE is active: $($de.Contains('class=`"active`">DE</a>'))"
"  is German: $($de.Contains('Fonds-Compliance'))"
