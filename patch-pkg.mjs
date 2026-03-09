import { readFileSync, writeFileSync } from "fs";
const f = "C:/Users/julia/projects/private-asset-registry_Caelith_v2/package.json";
const raw = readFileSync(f, "utf8").replace(/^\uFEFF/, ""); // strip BOM
const p = JSON.parse(raw);
p.scripts["test:smoke"] = "playwright test --project=smoke";
p.scripts["test:qa"] = "playwright test --project=full-qa";
p.scripts["test:qa:report"] = "playwright test --project=full-qa && playwright show-report e2e/report";
writeFileSync(f, JSON.stringify(p, null, 2) + "\n", "utf8");
console.log("OK:", Object.keys(p.scripts).filter(k=>k.startsWith("test:")));