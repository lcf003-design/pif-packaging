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
        sku: { stringValue: "PET-2-OZ-BLT-CT-AMB-NC" },
        slug: { stringValue: "2-oz-amber-pet-plastic-bullet-bottle-cap-not-included" },
        name: { stringValue: "2 oz Amber PET Plastic Bullet Bottle (Cap Not Included)" },
        brand: { stringValue: "PIF Packaging" },
        categories: { 
            arrayValue: { 
                values: [ { stringValue: "Bottles" } ] 
            } 
        },
        industry: { 
            arrayValue: { 
                values: [ 
                    { stringValue: "Personal Health & Beauty" },
                    { stringValue: "Cosmetics" },
                    { stringValue: "Pharma, Nutraceuticals & Healthcare" }
                ] 
            } 
        },
        material: { stringValue: "PET" },
        materialGroup: { stringValue: "Plastic" },
        color: { stringValue: "Amber" },
        shape: { stringValue: "Bullet" },
        neckFinish: { stringValue: "Continuous Thread" },
        capSize: { stringValue: "20-410" },
        caseQty: { integerValue: 884 },
        palletQty: { integerValue: 22100 },
        capacity: { 
            mapValue: { 
                fields: { 
                    value: { integerValue: 2 }, 
                    unit: { stringValue: "oz" } 
                } 
            } 
        },
        imageUrl: { stringValue: "/images/catalog/yp-ab2_bullet_amber.jpg" },
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/yp-ab2_bullet_amber.jpg" }
            ]
          }
        },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "Cap Size: 20-410 (sold separately)" },
                    { stringValue: "UV Resistant" },
                    { stringValue: "BPA NI (Not Intentionally Added)*" }
                ]
            }
        },
        description: { stringValue: "Achieve a sleek, elevated aesthetic with our 2 oz Amber PET Bullet Bottle. Also known as a Cosmo Round, this tall, slender profile features soft sloping shoulders and a stable base, making it an exceptional packaging choice for premium cosmetics, serums, and high-end personal care solutions.\n\nCrafted from durable, lightweight PET plastic, the shatter-resistant construction ensures safe handling and transit. The distinct amber tint provides critical UV resistance, safeguarding light-sensitive formulations from degradation while offering a luxurious visual appeal.\n\nDesigned with a standard 20-410 continuous thread neck finish, this bottle pairs seamlessly with a variety of fine mist sprayers, treatment pumps, or simple screw caps to match your exact dispensing needs.\n\n*Please note: Closure is sold separately. Bisphenol A (BPA) was not intentionally used in the manufacture of this item.*" },
        specifications: {
            mapValue: {
                fields: {
                    "Case Qty": { stringValue: "884" },
                    "Pallet Qty": { stringValue: "22100" },
                    "Capacity": { stringValue: "2 oz (60 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "PET - Polyethylene Terephthalate" },
                    "Color": { stringValue: "Amber" },
                    "Shape": { stringValue: "Round" },
                    "Lining": { stringValue: "Unlined" },
                    "Neck Finish": { stringValue: "Continuous Thread" },
                    "Diameter": { stringValue: "1.3 in" },
                    "Height": { stringValue: "4.1 in" },
                    "Gram Weight": { stringValue: "9.53" },
                    "Label Panel Dimensions": { stringValue: "3.743 w x 2.746 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Size": { stringValue: "20-410" }
                }
            }
        },
        price: { doubleValue: 0.34 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create Amber Bullet Bottle...");
    
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
