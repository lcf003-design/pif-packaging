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

    // We noticed the frontend UI builds the table using the `specifications` free-form mapping 
    // for some of the extended fields instead of strictly mapping to native objects.
    const payload = {
      fields: {
        materialGroup: { stringValue: 'Metals' },
        material: { stringValue: 'Tinplate' },
        color: { stringValue: 'Silver' },
        shape: { stringValue: 'Round' },
        neckFinish: { stringValue: 'Continuous Thread' },
        dimensions: {
          mapValue: {
            fields: {
              diameter: { stringValue: '3.2 in' },
              height: { stringValue: '2 in' }
            }
          }
        },
        weight: { stringValue: '65' },   // User explicitly asked for "65" instead of "65g"
        caseQty: { integerValue: '36' },
        labelPanel: {
          mapValue: {
            fields: {
              dimensions: { stringValue: '2.480' },
              shape: { stringValue: 'Round' }
            }
          }
        },
        closure: {
          mapValue: {
            fields: {
              type: { stringValue: 'Continuous Thread' },
              color: { stringValue: 'Silver' }
            }
          }
        },
        // Force the extended custom mapped specifications array for fields the frontend 
        // doesn't natively pull from root keys.
        specifications: {
          mapValue: {
            fields: {
              Capacity: { stringValue: "8 oz (236 ml)" },
              "Material Group": { stringValue: "Metals" },
              "Material Type": { stringValue: "Tinplate" }
            }
          }
        }
      }
    };

    const fetch = require('node-fetch');
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products/${targetId}?updateMask.fieldPaths=materialGroup&updateMask.fieldPaths=material&updateMask.fieldPaths=color&updateMask.fieldPaths=shape&updateMask.fieldPaths=neckFinish&updateMask.fieldPaths=dimensions&updateMask.fieldPaths=weight&updateMask.fieldPaths=caseQty&updateMask.fieldPaths=labelPanel&updateMask.fieldPaths=closure&updateMask.fieldPaths=specifications`;
    
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
