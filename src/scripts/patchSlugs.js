const { GoogleAuth } = require('google-auth-library');
const fetch = require('node-fetch');

async function main() {
  const projectId = 'packaging-catalog';
  
  if (!require('fs').existsSync('./service-account.json')) {
      console.error("service-account.json not found in root.");
      process.exit(1);
  }

  const auth = new GoogleAuth({
    keyFile: './service-account.json',
    scopes: ['https://www.googleapis.com/auth/datastore'],
  });

  const products = [
    { id: 'XAMwoBrCdRTo7vfaXaZP', slug: '2-oz-dark-amber-pet-plastic-wide-mouth-packer-bottles-black-screw-top-cap' },
    { id: '5XsHX9Aw2EhAFpS8MHDh', slug: '2-oz-white-hdpe-plastic-wide-mouth-packer-bottles-cap-not-included' },
    { id: 'd3RQxsxaOQYeb3ipDsj0', slug: '50-ml-clear-pet-plastic-mini-liquor-bottles-white-tamper-evident-cap' },
    { id: '1RvKLq4Ve3BgAb0t8Ivw', slug: '50-ml-clear-pet-plastic-mini-liquor-bottles-cap-not-included' },
    { id: '2Fozilp7yNTe6Y8CldEf', slug: '2-oz-natural-ldpe-plastic-oval-bottles-cap-not-included' }
  ];

  try {
    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const token = tokenResponse.token;

    for (const product of products) {
        const payload = {
            fields: {
                slug: { stringValue: product.slug }
            }
        };

        const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products/${product.id}?updateMask.fieldPaths=slug`;
        const res = await fetch(url, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            console.log(`Successfully patched slug for ${product.id} -> ${product.slug}`);
        } else {
            console.error(`Failed to patch ${product.id}:`, await res.text());
        }
    }
  } catch (err) {
    console.error("Fatal Error:", err);
  }
}
main();
