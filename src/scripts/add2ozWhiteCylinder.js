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
        slug: { stringValue: "2-oz-white-hdpe-plastic-cylinder-bottles-cap-not-included" },
        name: { stringValue: "2 oz White HDPE Plastic Cylinder Bottles (Cap Not Included)" },
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
                    { stringValue: "Industrial Chemical" },
                    { stringValue: "Home Care" }
                ] 
            } 
        },
        material: { stringValue: "HDPE" },
        materialGroup: { stringValue: "Plastic" },
        color: { stringValue: "White" },
        shape: { stringValue: "Round" }, // Actually Cylinder, but visual says Round
        neckFinish: { stringValue: "Continuous Thread" },
        capSize: { stringValue: "20-410" },
        caseQty: { integerValue: 900 },
        palletQty: { integerValue: 16200 },
        capacity: { 
            mapValue: { 
                fields: { 
                    value: { integerValue: 2 }, 
                    unit: { stringValue: "oz" } 
                } 
            } 
        },
        imageUrl: { stringValue: "/images/catalog/3560b03-b_cylinder_white_2oz.jpg" },
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/3560b03-b_cylinder_white_2oz.jpg" }
            ]
          }
        },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "Cap Size: 20-410 (sold separately)" },
                    { stringValue: "Bottles are flame treated, which makes label application easier" },
                    { stringValue: "BPA NI (Not Intentionally Added)*" }
                ]
            }
        },
        description: { stringValue: "Maximize shelf-presence and operational efficiency with our 2 oz White HDPE Cylinder Bottle. Known for their sheer tubular profile and straight, statuesque sidewalls, cylinder bottles are highly sought after across health, beauty, and industrial markets—perfect for everything from specialized hair gels to robust household cleaners.\n\nConstructed from High-Density Polyethylene (HDPE), this container offers superb impact resistance and a clean, opaque white finish that effectively masks the product inside while providing a stark, high-contrast background for your branding. To optimize the production line, these bottles are flame-treated during manufacturing, ensuring superior adhesion and perfectly smooth application for wraparound labels.\n\n*Please note: Closure is sold separately. Bisphenol A (BPA) was not intentionally used in the manufacture of this item.*" },
        specifications: {
            mapValue: {
                fields: {
                    "Case Qty": { stringValue: "900" },
                    "Pallet Qty": { stringValue: "16200" },
                    "Capacity": { stringValue: "2 oz (60 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "HDPE - High Density Polyethylene" },
                    "Color": { stringValue: "White" },
                    "Shape": { stringValue: "Round" },
                    "Neck Finish": { stringValue: "Continuous Thread" },
                    "Diameter": { stringValue: "1.385 in" },
                    "Height": { stringValue: "3.66 in" },
                    "Gram Weight": { stringValue: "8.5" },
                    "Label Panel Dimensions": { stringValue: "4.098 w x 2.312 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Size": { stringValue: "20-410" }
                }
            }
        },
        price: { doubleValue: 0.15 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create 2 oz White Cylinder...");
    
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
        console.log("SUCCESS!", data.name);
    } else {
        console.error("ERROR:", JSON.stringify(data, null, 2));
    }

  } catch (err) {
    console.error("Fatal Error:", err);
  }
}

main();
