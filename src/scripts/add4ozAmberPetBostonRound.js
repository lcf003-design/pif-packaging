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
        sku: { stringValue: "PET-4-OZ-BOS-CT-AMB-NC" },
        slug: { stringValue: "4-oz-amber-pet-boston-round-cap-not-included" },
        name: { stringValue: "4 oz Amber PET Boston Round (Cap Not Included)" },
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
        material: { stringValue: "PET" },
        materialGroup: { stringValue: "Plastic" },
        color: { stringValue: "Amber" },
        shape: { stringValue: "Boston Round" },
        neckFinish: { stringValue: "Continuous Thread" },
        capSize: { stringValue: "24-410" },
        caseQty: { integerValue: 500 },
        palletQty: { integerValue: 10000 },
        capacity: { 
            mapValue: { 
                fields: { 
                    value: { integerValue: 4 }, 
                    unit: { stringValue: "oz" } 
                } 
            } 
        },
        imageUrl: { stringValue: "/images/catalog/1109B05-B_Amber_BostonRound.jpg" },
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/1109B05-B_Amber_BostonRound.jpg" }
            ]
          }
        },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "Cap Size: 24-410 (sold separately)" },
                    { stringValue: "Premium PET resin offers high-clarity and shatter-resistant safety" },
                    { stringValue: "Amber tint provides critical UV protection for light-sensitive compounds" }
                ]
            }
        },
        description: { stringValue: "Our 4 oz Amber PET Boston Round bottle provides a distinctive, premium aesthetic combined with industrial-grade resilience. The classic 'Boston Round' silhouette features rounded shoulders and a sturdy base, optimized for automated filling lines and secure transit in high-density cases. \n\nCrafted from high-clarity Polyethylene Terephthalate (PET), this container achieves the classic visual appeal of amber glass while eliminating the risk of shatter during transit and reducing overall shipping weights. The amber tint is rigorously formulated to provide essential UV screening, protecting the efficacy and shelf-life of light-sensitive pharmaceuticals, essential oils, personal care serums, and analytical reagents.\n\n*Please note: Closure is sold separately. Compatible with a wide array of 24-410 continuous thread caps, droppers, and fine mist sprayers.*" },
        specifications: {
            mapValue: {
                fields: {
                    "Case Qty": { stringValue: "500" },
                    "Pallet Qty": { stringValue: "10000" },
                    "Capacity": { stringValue: "4 oz (120 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "PET - Polyethylene Terephthalate" },
                    "Color": { stringValue: "Amber" },
                    "Shape": { stringValue: "Boston Round" },
                    "Neck Finish": { stringValue: "Continuous Thread" },
                    "Diameter": { stringValue: "1.89 in" },
                    "Height": { stringValue: "4.45 in" },
                    "Gram Weight": { stringValue: "12" },
                    "Label Panel Dimensions": { stringValue: "5.8 w x 2.7 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Size": { stringValue: "24-410" }
                }
            }
        },
        price: { doubleValue: 0.55 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create 4 oz Amber PET Boston Round...");
    
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
