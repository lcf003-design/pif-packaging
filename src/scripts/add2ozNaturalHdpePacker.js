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
        sku: { stringValue: "HDPE-2-OZ-PKR-CT-NAT-NC" },
        slug: { stringValue: "2-oz-natural-hdpe-plastic-wide-mouth-packer-bottles-cap-not-included" },
        name: { stringValue: "2 oz Natural HDPE Plastic Wide Mouth Packer Bottles (Cap Not Included)" },
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
        color: { stringValue: "Natural" },
        shape: { stringValue: "Round" }, // Actually Packer/Round, image says Round
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
        imageUrl: { stringValue: "/images/catalog/3600b03-b_packer_natural.jpg" },
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/3600b03-b_packer_natural.jpg" }
            ]
          }
        },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "Cap Size: 33-400 (sold separately)" },
                    { stringValue: "FDA Food Contact Compliant, Molded in the USA" },
                    { stringValue: "BPA NI (Not Intentionally Added)*" }
                ]
            }
        },
        description: { stringValue: "Our 2 oz Natural HDPE Packer Bottle brings unparalleled operational efficiency to high-volume pharmaceutical, nutraceutical, and vitamin filling lines. Fabricated from premium high-density polyethylene, this container offers robust shatter-resistance and a desirable semi-translucent natural finish, allowing consumers to easily gauge product fill-levels.\n\nThe wide-mouth profile accommodates a seamless dispensing UX for capsules, tablets, or powders, while the precision-engineered 33-400 continuous thread neck finish ensures rigid compatibility with a vast array of secure locking closures.\n\n*Please note: Cap is sold separately. Bisphenol A (BPA) was not intentionally used in the manufacture of this item.*" },
        specifications: {
            mapValue: {
                fields: {
                    "Case Qty": { stringValue: "1000" },
                    "Pallet Qty": { stringValue: "20000" },
                    "Capacity": { stringValue: "60 ml (60 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "HDPE - High Density Polyethylene" },
                    "Color": { stringValue: "Natural" },
                    "Shape": { stringValue: "Round" },
                    "Neck Finish": { stringValue: "Continuous Thread" },
                    "Diameter": { stringValue: "1.6 in" },
                    "Height": { stringValue: "3 in" },
                    "Gram Weight": { stringValue: "9.9" },
                    "Label Panel Dimensions": { stringValue: "4.664 w x 1.923 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Size": { stringValue: "33-400" }
                }
            }
        },
        price: { doubleValue: 0.40 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create 2 oz Natural HDPE Packer Bottle...");
    
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
