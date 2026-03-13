const { GoogleAuth } = require('google-auth-library');

async function main() {
  const targetId = 'QsP0ZDdjTR3b9t7FrsUH';
  const projectId = 'packaging-catalog';
  
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

    const payload = {
      fields: {
        imageUrl: { 
          stringValue: "/images/catalog/8_oz_flush_seal_tin_silver.png"
        }
      }
    };

    const fetch = require('node-fetch');
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products/${targetId}?updateMask.fieldPaths=imageUrl`;
    
    console.log("Sending REST Request to Firestore...");
    
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
        console.log("SUCCESS! Firestore Document Patched via REST API.", data.name);
        process.exit(0);
    } else {
        console.error("ERROR from Firestore:", JSON.stringify(data, null, 2));
        process.exit(1);
    }

  } catch (err) {
    console.error("Fatal Error:", err);
    process.exit(1);
  }
}

main();
