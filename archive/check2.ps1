$c = (Invoke-WebRequest 'http://localhost:3000/api/landing' -UseBasicParsing).Content
"favicon-svg: $($c.Contains('favicon.svg'))"
"favicon-png: $($c.Contains('favicon-32x32.png'))"
"lang-switch: $($c.Contains('lang-switch'))"
"lang-de: $($c.Contains('lang=de'))"
"dashboard-links: $($c.Contains('caelith.tech/dashboard'))"
"no-login: $(-not $c.Contains('/login'))"
"canonical: $($c.Contains('canonical'))"
