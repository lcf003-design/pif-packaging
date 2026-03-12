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
        sku: { stringValue: "36102-B" },
        name: { stringValue: "2 oz White HDPE Plastic Wide Mouth Packer Bottles (Cap Not Included)" },
        brand: { stringValue: "PIF Packaging" },
        categories: { 
            arrayValue: { 
                values: [ { stringValue: "Bottles" } ] 
            } 
        },
        industry: { 
            arrayValue: { 
                values: [ 
                    { stringValue: "Pharma, Nutraceuticals & Healthcare" },
                    { stringValue: "Personal Health & Beauty" }
                ] 
            } 
        },
        material: { stringValue: "HDPE" },
        materialGroup: { stringValue: "Plastic" },
        color: { stringValue: "White" },
        shape: { stringValue: "Packer" },
        neckFinish: { stringValue: "Continuous Thread" },
        capSize: { stringValue: "33-400" },
        caseQty: { integerValue: 1000 },
        palletQty: { integerValue: 20000 },
        capacity: { 
            mapValue: { 
                fields: { 
                    value: { integerValue: 2 }, 
                    unit: { stringValue: "oz" } 
                } 
            } 
        },
        imageUrl: { stringValue: "/images/catalog/36102-b_packer_white.jpg" },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "2 oz White HDPE Plastic Wide Mouth Packer Bottles" },
                    { stringValue: "Cap Size: 33-400 (sold separately)" },
                    { stringValue: "FDA Food Contact Compliant, Molded in the USA, BPA NI*" }
                ]
            }
        },
        description: { stringValue: "Our 2 oz White HDPE Packer is precision-engineered for the pharmaceutical, nutraceutical, and premium wellness sectors. The high-density polyethylene construction offers exceptional durability, impact resistance, and a classic opaque finish that protects light-sensitive contents while providing a pristine canvas for custom labeling.\n\nDesigned for operational efficiency, the wide-mouth profile guarantees seamless filling and dispensing of capsules, tablets, or powders. This versatile container is compatible with a wide range of 33-400 continuous thread closures, allowing for brand-specific customization across your product lines.\n\n*Please note: Closure is sold separately. This product is manufactured in the USA from FDA food-contact compliant materials without the intentional use of Bisphenol A (BPA).*" },
        specifications: {
            mapValue: {
                fields: {
                    "Case Qty": { stringValue: "1000" },
                    "Pallet Qty": { stringValue: "20000" },
                    "Capacity": { stringValue: "60 ml (60 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "HDPE - High Density Polyethylene" },
                    "Color": { stringValue: "White" },
                    "Shape": { stringValue: "Round" },
                    "Neck Finish": { stringValue: "Continuous Thread" },
                    "Diameter": { stringValue: "1.6 in" },
                    "Height": { stringValue: "3 in" },
                    "Gram Weight": { stringValue: "9.5" },
                    "Label Panel Dimensions": { stringValue: "4.664 w x 1.923 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Size": { stringValue: "33-400" }
                }
            }
        },
        price: { doubleValue: 0.25 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create new Pack Bottle...");
    
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
