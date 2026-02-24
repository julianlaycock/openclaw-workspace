const API = 'https://www.caelith.tech/api';

async function main() {
  // 1. Try registering demo account through frontend proxy
  console.log('Creating demo account via frontend proxy...');
  try {
    const regRes = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'demo@caelith.tech',
        password: 'CaelithDemo2026!',
        name: 'Demo Account'
      })
    });
    const text = await regRes.text();
    console.log('Register:', regRes.status, text.substring(0, 300));
  } catch(e) {
    console.log('Register error:', e.message);
  }

  // 2. Login with admin to get a token for seeding
  console.log('\nLogging in as admin...');
  try {
    const loginRes = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@caelith.com',
        password: 'Admin1234'
      })
    });
    const text = await loginRes.text();
    console.log('Admin login:', loginRes.status, text.substring(0, 300));
  } catch(e) {
    console.log('Login error:', e.message);
  }
}

main().catch(e => console.error(e));
