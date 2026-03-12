const { GoogleAuth } = require('google-auth-library');
const fetch = require('node-fetch');

async function main() {
  const projectId = 'packaging-catalog';
  const targetId = 'XAMwoBrCdRTo7vfaXaZP'; // The ID we just generated
  
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
        description: { stringValue: "Our 2 oz Dark Amber PET Packer is engineered for premium health, wellness, and pharmaceutical applications. The heavy-weight PET construction provides the classic aesthetic of amber glass while delivering the shatterproof durability and shipping advantages of modern plastics.\n\nProviding crucial UV-resistance, the dark amber tint protects light-sensitive compounds, supplements, and vitamins from degradation. The wide-mouth profile ensures flawless integration with automated filling lines and provides a frictionless dispensing experience for the end-user.\n\nThis complete packaging solution arrives pre-paired with a tactile, ribbed black polypropylene (PP) continuous thread closure. Engineered for a secure grip in any environment, the closure features an integrated F217 foam-core liner—an industry standard for preventing odor transmission, locking in freshness, and maintaining strict product integrity without impacting flavor profiles." }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products/${targetId}?updateMask.fieldPaths=description`;
    
    console.log("Sending REST Request to Firestore to PATCH the Packer Bottle Description with Original Copy...");
    
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
        console.log("SUCCESS! Description PATCHED via REST API.", data.name);
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
