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
        sku: { stringValue: "LDPE-2-OZ-OVL-CT-NAT" },
        name: { stringValue: "2 oz Natural LDPE Plastic Oval Bottles (Cap Not Included)" },
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
                    { stringValue: "Automotive" },
                    { stringValue: "Home Care" }
                ] 
            } 
        },
        material: { stringValue: "LDPE" },
        materialGroup: { stringValue: "Plastic" },
        color: { stringValue: "Natural" },
        shape: { stringValue: "Oval" },
        neckFinish: { stringValue: "Continuous Thread" },
        capSize: { stringValue: "18-410" },
        caseQty: { integerValue: 750 },
        palletQty: { integerValue: 18000 },
        capacity: { 
            mapValue: { 
                fields: { 
                    value: { integerValue: 2 }, 
                    unit: { stringValue: "oz" } 
                } 
            } 
        },
        imageUrl: { stringValue: "/images/catalog/32002-b_oval_natural.jpg" },
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/32002-b_oval_natural.jpg" }
            ]
          }
        },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "2 oz Natural LDPE Plastic Oval Bottles" },
                    { stringValue: "Cap Size: 18-410 (sold separately)" },
                    { stringValue: "BPA NI (Not Intentionally Added)*" }
                ]
            }
        },
        description: { stringValue: "Engineered for maximum utility and precision dispensing, our 2 oz Natural LDPE Oval Bottle is a staple across the industrial, automotive, and personal care sectors. Manufactured from Low-Density Polyethylene (LDPE), this container offers exceptional \"squeeze\" flexibility—allowing end-users to effortlessly control the flow of cutting fluids, high-viscosity lubricants, adhesives, or specialized liquid cosmetics.\n\nThe ergonomic oval profile not only provides a comfortable, secure grip during application but also optimizes shelf space and packing density during transit. The semi-translucent natural finish allows for easy visual monitoring of the remaining contents, while the 18-410 continuous thread neck securely locks down dispensing caps or standard closures.\n\n*Please note: Closure is sold separately. Bisphenol A (BPA) was not intentionally used in the manufacture of this item.*" },
        specifications: {
            mapValue: {
                fields: {
                    "Case Qty": { stringValue: "750" },
                    "Pallet Qty": { stringValue: "18000" },
                    "Capacity": { stringValue: "2 oz (60 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "LDPE - Low Density Polyethylene" },
                    "Color": { stringValue: "Natural" },
                    "Shape": { stringValue: "Oval" },
                    "Neck Finish": { stringValue: "Continuous Thread" },
                    "Length": { stringValue: "1 in" },
                    "Width": { stringValue: "2 in" },
                    "Depth": { stringValue: "2 in" },
                    "Height": { stringValue: "3.7 in" },
                    "Gram Weight": { stringValue: "11" },
                    "Label Panel Dimensions": { stringValue: "1.159 w x 2.250 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Size": { stringValue: "18-410" }
                }
            }
        },
        price: { doubleValue: 0.32 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create LDPE Oval Bottle...");
    
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
