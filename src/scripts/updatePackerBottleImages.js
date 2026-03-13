const { GoogleAuth } = require('google-auth-library');
const fetch = require('node-fetch');

async function main() {
  const projectId = 'packaging-catalog';
  const targetId = 'XAMwoBrCdRTo7vfaXaZP'; // The Amber Packer Bottle
  
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
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/3369b01abr_packer_amber.jpg" },
              { stringValue: "/images/catalog/3369b01-babr_packer_amber_side.jpg" },
              { stringValue: "/images/catalog/x33-400blk_cap_amber_packer.jpg" }
            ]
          }
        }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products/${targetId}?updateMask.fieldPaths=images`;
    
    console.log("Sending REST Request to Firestore to PATCH the Packer Bottle Images...");
    
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
        console.log("SUCCESS! Images PATCHED via REST API.", data.name);
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
