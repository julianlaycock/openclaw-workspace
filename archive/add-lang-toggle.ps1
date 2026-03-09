# Add language toggle to EN landing page
$f = 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-en.ts'
$c = Get-Content $f -Raw -Encoding UTF8

# Add CSS for lang toggle right before </style>
$toggleCSS = '.lang-toggle{position:fixed;top:12px;right:16px;z-index:1002;display:flex;gap:0;border-radius:999px;background:rgba(26,31,31,0.7);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1);padding:3px;font-family:''JetBrains Mono'',monospace;font-size:9px;letter-spacing:0.5px}\n.lang-toggle a{padding:4px 10px;border-radius:999px;color:rgba(255,255,255,0.4);text-decoration:none;transition:all .2s}\n.lang-toggle a:hover{color:rgba(255,255,255,0.7)}\n.lang-toggle a.active{background:rgba(255,255,255,0.12);color:#fff}\n'
$c = $c.Replace('</style>', $toggleCSS + '</style>')

# Add toggle HTML right after <body>
$toggleEN = '<div class=\"lang-toggle\"><a href=\"/api/landing?lang=en\" class=\"active\">EN</a><a href=\"/api/landing?lang=de\">DE</a></div>\n'
$c = $c.Replace('<body>\n', '<body>\n' + $toggleEN)

Set-Content $f -Value $c -Encoding UTF8 -NoNewline
Write-Host "EN done. Size: $((Get-Item $f).Length)"

# Add to DE landing page
$f2 = 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-de.ts'
$c2 = Get-Content $f2 -Raw -Encoding UTF8

$c2 = $c2.Replace('</style>', $toggleCSS + '</style>')

$toggleDE = '<div class=\"lang-toggle\"><a href=\"/api/landing?lang=en\">EN</a><a href=\"/api/landing?lang=de\" class=\"active\">DE</a></div>\n'
$c2 = $c2.Replace('<body>\n', '<body>\n' + $toggleDE)

Set-Content $f2 -Value $c2 -Encoding UTF8 -NoNewline
Write-Host "DE done. Size: $((Get-Item $f2).Length)"
