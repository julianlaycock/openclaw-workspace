# Create Demo Account — Manual Steps

The Railway backend API appears to be down (possibly trial credits exhausted).

## Option 1: Via the UI
1. Go to https://www.caelith.tech/login
2. If there's a "Register" link, create: `demo@caelith.tech` / `CaelithDemo2026!` / "Demo Account"
3. Then login as admin (`admin@caelith.com` / `Admin1234`) and upgrade the demo account's role if needed

## Option 2: Via Railway Database (direct)
Connect to the Postgres database:
```
Host: tramway.proxy.rlwy.net
Port: 33162
User: postgres
DB: railway
```

Then run:
```sql
-- Check if demo account already exists
SELECT * FROM users WHERE email = 'demo@caelith.tech';

-- If not, insert (password hash for 'CaelithDemo2026!' — generate with bcrypt)
-- Or use the app's register endpoint once the backend is back up
```

## Option 3: Seed Script (when backend is running)
```bash
curl -X POST https://www.caelith.tech/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@caelith.tech","password":"CaelithDemo2026!","name":"Demo Account"}'
```

## ⚠️ Railway Status
- Trial budget was ~$4.81 with 25 days left (as of Feb 18)
- If backend is down, check Railway dashboard: https://railway.app
- May need to upgrade to Hobby plan ($5/mo) to keep services running

## Demo Data to Seed
Once the account exists, seed these via the API or database:

### Funds (3)
1. **Rhein Capital Spezial-AIF** — Germany, KAGB, 8 investors
2. **Alpen Invest ELTIF** — Luxembourg, ELTIF 2.0, 6 investors  
3. **Hanseatische Beteiligungen** — Germany, AIFMD II, 7 investors

### Investors (21 across all funds)
Mix of:
- 10 Professional investors (insurance companies, pension funds, banks)
- 7 Semi-professional investors (family offices, HNW individuals with >€200K)
- 4 Retail investors (2 should be flagged as non-compliant for demo drama)

### Realistic German Names
- Bayerische Versicherung AG (Professional)
- Münchener Rückversicherung (Professional)
- Stadtsparkasse Frankfurt (Professional)
- Werner & Koch Family Office (Semi-professional)
- Dr. Isabella Hartmann (Semi-professional, €500K commitment)
- Thomas Bergmann (Retail — flagged, below minimum threshold)
- Maria Schneider (Retail — flagged, missing documentation)
