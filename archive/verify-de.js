const f=require('fs').readFileSync('C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\src\\app\\api\\landing\\landing-de.ts','utf8');
const checks=['Fondscompliance','automatisiert','1.990','DSGVO','lang=de','font-weight:700;text-decoration:none\">DE','Keine Registrierung','Häufig gestellte Fragen','Vier Schritte','Audit-Bereitschaft','lang=\\"de\\"','html lang=\\"de\\"'];
checks.forEach(c=>console.log(c,':',f.includes(c)?'OK':'MISSING'));
