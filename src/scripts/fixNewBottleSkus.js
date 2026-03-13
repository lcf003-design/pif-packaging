const { GoogleAuth } = require('google-auth-library');
const fetch = require('node-fetch');

async function main() {
  const projectId = 'packaging-catalog';
  const amberId = 'XAMwoBrCdRTo7vfaXaZP';
  const whiteId = '5XsHX9Aw2EhAFpS8MHDh';

  if (!require('fs').existsSync('./service-account.json')) {
      console.error("service-account.json not found in root.");
      process.exit(1);
  }

  const auth = new GoogleAuth({
    keyFile: './service-account.json',
    scopes: ['https://www.googleapis.com/auth/datastore'],
  });

  try {
    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const token = tokenResponse.token;

    // PATCH Amber Bottle
    const amberPayload = {
      fields: {
        sku: { stringValue: "PET-2-OZ-PKR-CT-AMB" }
      }
    };
    
    // PATCH White Bottle
    const whitePayload = {
      fields: {
        sku: { stringValue: "HDPE-2-OZ-PKR-CT-WHT" }
      }
    };

    console.log("Patching Amber Bottle SKU...");
    const amberRes = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products/${amberId}?updateMask.fieldPaths=sku`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(amberPayload)
    });

    console.log("Patching White Bottle SKU...");
    const whiteRes = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products/${whiteId}?updateMask.fieldPaths=sku`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(whitePayload)
    });

    if (amberRes.ok && whiteRes.ok) {
        console.log("SUCCESS! Both products have been updated to proprietary Smart SKUs.");
        process.exit(0);
    } else {
        console.error("ERROR from Firestore.");
        process.exit(1);
    }

  } catch (err) {
    console.error("Fatal Error:", err);
    process.exit(1);
  }
}

main();
