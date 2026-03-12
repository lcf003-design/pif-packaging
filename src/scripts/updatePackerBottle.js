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
        name: { stringValue: "2 oz Dark Amber PET Plastic Wide Mouth Packer Bottles (Black Screw Top Cap)" },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "2 oz Dark Amber PET Plastic Wide Mouth Packer Bottles" },
                    { stringValue: "Includes a Black PP Plastic Ribbed Screw Top Cap with Foam Liner" },
                    { stringValue: "UV Resistant, FDA Food Contact Compliant, Molded in the USA, BPA NI*" }
                ]
            }
        },
        description: { stringValue: "Packer bottles, also known as pill bottles, vitamin bottles, or prescription bottles — are popular items seen on retail shelves everywhere. Featuring a convenient large opening, these pill bottles are designed to make filling or dispensing easy for nearly any application.\n\nIncludes a Black Ribbed Polypropylene Screw Cap with Liner\n\nBlack PP Cap is ribbed, making it easy to grip and open — even with wet hands. Cap includes a three-ply co — extruded liner consisting of foamed and solid LDPE (F217). Foam core is between two pieces of solid clear LDPE. Liner protects from odor transmission and does not impact the taste of products.\n\n*Bisphenol A was not intentionally used in the manufacture of this item." },
        specifications: {
            mapValue: {
                fields: {
                    "Capacity": { stringValue: "60 ml (60 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "PET - Polyethylene Terephthalate" },
                    "Color": { stringValue: "Dark Amber" },
                    "Shape": { stringValue: "Round" },
                    "Neck Finish": { stringValue: "Continuous Thread" },
                    "Diameter": { stringValue: "1.5 in" },
                    "Height": { stringValue: "2.8 in" },
                    "Gram Weight": { stringValue: "11" },
                    "Label Panel Dimensions": { stringValue: "4.497 w x 1.675 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Style": { stringValue: "Continuous Thread" },
                    "Cap Color": { stringValue: "Black" },
                    "Cap Size": { stringValue: "33-400" }
                }
            }
        }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products/${targetId}?updateMask.fieldPaths=name&updateMask.fieldPaths=features&updateMask.fieldPaths=description&updateMask.fieldPaths=specifications`;
    
    console.log("Sending REST Request to Firestore to PATCH the Packer Bottle Specs...");
    
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
        console.log("SUCCESS! Firestore Document PATCHED via REST API.", data.name);
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
