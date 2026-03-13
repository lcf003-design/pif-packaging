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

  try {
    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const token = tokenResponse.token;

    const payload = {
      fields: {
        sku: { stringValue: "PET-50-ML-RND-TE-CLR-NC" },
        name: { stringValue: "50 ml Clear PET Plastic Mini Liquor Bottles (Cap Not Included)" },
        brand: { stringValue: "PIF Packaging" },
        categories: { 
            arrayValue: { 
                values: [ { stringValue: "Bottles" } ] 
            } 
        },
        industry: { 
            arrayValue: { 
                values: [ 
                    { stringValue: "Spirits" },
                    { stringValue: "Beverage" }
                ] 
            } 
        },
        material: { stringValue: "PET" },
        materialGroup: { stringValue: "Plastic" },
        color: { stringValue: "Clear" },
        shape: { stringValue: "Round" },
        neckFinish: { stringValue: "Tamper Evident, KERR" },
        capSize: { stringValue: "18-KERR" },
        caseQty: { integerValue: 1056 },
        palletQty: { integerValue: 21120 },
        capacity: { 
            mapValue: { 
                fields: { 
                    value: { integerValue: 50 }, 
                    unit: { stringValue: "ml" } 
                } 
            } 
        },
        imageUrl: { stringValue: "/images/catalog/71000-b_mini_liquor_bottle_no_cap.jpg" },
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/71000-b_mini_liquor_bottle_no_cap.jpg" }
            ]
          }
        },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "Cap Size: 18-KERR (sold separately)" },
                    { stringValue: "FDA Food Contact Compliant" },
                    { stringValue: "Molded in the USA, BPA NI*" }
                ]
            }
        },
        description: { stringValue: "Our 50 ml Clear PET Mini Liquor Bottle offers premium presentation for craft spirits, sample-size syrups, and high-value liquid additions. Crafted from top-tier, lightweight PET plastic, this shatter-resistant alternative to glass reduces shipping costs while maintaining crystal-clear visibility that beautifully highlights your liquid contents.\n\nDesigned with a robust KERR neck finish, this bottle seamlessly accommodates tamper-evident 18-KERR closures, ensuring ultimate product security and consumer confidence from the bottling line to the retail shelf.\n\n*Please note: Cap is sold separately. Bisphenol A (BPA) was not intentionally used in the manufacture of this item.*" },
        specifications: {
            mapValue: {
                fields: {
                    "Case Qty": { stringValue: "1056" },
                    "Pallet Qty": { stringValue: "21120" },
                    "Capacity": { stringValue: "50 ml (50 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "PET - Polyethylene Terephthalate" },
                    "Color": { stringValue: "Clear" },
                    "Shape": { stringValue: "Round" },
                    "Neck Finish": { stringValue: "Tamper Evident, KERR" },
                    "Diameter": { stringValue: "1.3 in" },
                    "Height": { stringValue: "4.2 in" },
                    "Gram Weight": { stringValue: "12" },
                    "Label Panel Dimensions": { stringValue: "3.744 w x 2.000 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Size": { stringValue: "18-KERR" }
                }
            }
        },
        price: { doubleValue: 0.23 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create new Mini Liquor Bottle (No Cap)...");
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
        console.log("SUCCESS! Firestore Document CREATED via REST API.", data.name);
        // The last segment of the name is the ID
        const parts = data.name.split('/');
        console.log("New Product ID:", parts[parts.length - 1]);
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
