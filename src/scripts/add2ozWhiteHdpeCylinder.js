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
        sku: { stringValue: "HDPE-2-OZ-CYL-CT-WHT-NC" },
        slug: { stringValue: "2-oz-white-hdpe-plastic-cylinder-bottle-cap-not-included" },
        name: { stringValue: "2 oz White HDPE Plastic Cylinder Bottle (Cap Not Included)" },
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
                    { stringValue: "Household & Automotive" }
                ] 
            } 
        },
        material: { stringValue: "HDPE" },
        materialGroup: { stringValue: "Plastic" },
        color: { stringValue: "White" },
        shape: { stringValue: "Cylinder" },
        neckFinish: { stringValue: "Continuous Thread" },
        capSize: { stringValue: "20-410" },
        caseQty: { integerValue: 800 },
        palletQty: { integerValue: 24000 },
        capacity: { 
            mapValue: { 
                fields: { 
                    value: { integerValue: 2 }, 
                    unit: { stringValue: "oz" } 
                } 
            } 
        },
        imageUrl: { stringValue: "/images/catalog/v2016001_1.webp" }, // We will use a placeholder or need to verify the image path
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/v2016001_1.webp" }
            ]
          }
        },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "Cap Size: 20-410 (sold separately)" },
                    { stringValue: "Sleek, straight-sided cylinder profile maximizes label application area" },
                    { stringValue: "Opaque white finish provides a clean aesthetic and light protection" }
                ]
            }
        },
        description: { stringValue: "Our 2 oz White HDPE Cylinder Bottle is engineered to deliver a clean, modern aesthetic for personal care, cosmetic, and household product lines. The straight-sided cylinder profile not only offers a sleek visual presentation but also maximizes the available surface area for high-fidelity label application and silk screening.\n\nManufactured from premium High-Density Polyethylene (HDPE), this container provides excellent moisture barrier properties and impact resistance. The opaque white finish offers a pure, clinical look while simultaneously providing crucial light-blocking properties to protect sensitive formulations from UV degradation.\n\n*Please note: Closure is sold separately. The 20-410 continuous thread neck finish is highly versatile, accommodating a wide range of standard caps, fine mist sprayers, and treatment pumps.*" },
        specifications: {
            mapValue: {
                fields: {
                    "Case Qty": { stringValue: "800" },
                    "Pallet Qty": { stringValue: "24000" },
                    "Capacity": { stringValue: "2 oz (60 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "HDPE - High Density Polyethylene" },
                    "Color": { stringValue: "White" },
                    "Shape": { stringValue: "Cylinder" },
                    "Neck Finish": { stringValue: "Continuous Thread" },
                    "Diameter": { stringValue: "1.25 in" },
                    "Height": { stringValue: "3.75 in" },
                    "Gram Weight": { stringValue: "6.5" },
                    "Label Panel Dimensions": { stringValue: "3.75 w x 3.0 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Size": { stringValue: "20-410" }
                }
            }
        },
        price: { doubleValue: 0.35 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create 2 oz White HDPE Cylinder Bottle...");
    
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
