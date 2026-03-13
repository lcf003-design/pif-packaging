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
        sku: { stringValue: "HDPE-4-OZ-PKR-CT-NAT" },
        name: { stringValue: "4 oz Natural HDPE Plastic Wide Mouth Packer Bottles (Cap Not Included)" },
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
        shape: { stringValue: "Packer" },
        neckFinish: { stringValue: "Continuous Thread" },
        capSize: { stringValue: "38-400" },
        caseQty: { integerValue: 500 },
        palletQty: { integerValue: 9000 },
        capacity: { 
            mapValue: { 
                fields: { 
                    value: { integerValue: 4 }, 
                    unit: { stringValue: "oz" } 
                } 
            } 
        },
        imageUrl: { stringValue: "/images/catalog/36004-b_packer_natural.jpg" },
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/36004-b_packer_natural.jpg" }
            ]
          }
        },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "Cap Size: 38-400 (sold separately)" },
                    { stringValue: "Features a convenient large opening" },
                    { stringValue: "BPA NI (Not Intentionally Added)" }
                ]
            }
        },
        description: { stringValue: "Our 4 oz Natural HDPE Packer Bottle brings unparalleled operational efficiency to high-volume pharmaceutical, nutraceutical, and vitamin filling lines. Fabricated from premium high-density polyethylene, this container offers robust shatter-resistance and a desirable semi-translucent natural finish, allowing consumers to easily gauge product fill-levels.\n\nThe wide-mouth profile accommodates a seamless dispensing UX for capsules, tablets, or powders, while the precision-engineered 38-400 continuous thread neck finish ensures rigid compatibility with a vast array of secure locking closures.\n\nTo ensure optimal adhesion and alignment on high-speed labeling lines, these bottles are flame-treated during the manufacturing process. *Cap sold separately. Bisphenol A (BPA) is not intentionally used in the manufacture of this item.*" },
        specifications: {
            mapValue: {
                fields: {
                    "Case Qty": { stringValue: "500" },
                    "Pallet Qty": { stringValue: "9000" },
                    "Capacity": { stringValue: "120 ml (120 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "HDPE - High Density Polyethylene" },
                    "Color": { stringValue: "Natural" },
                    "Shape": { stringValue: "Round" },
                    "Neck Finish": { stringValue: "Continuous Thread" },
                    "Diameter": { stringValue: "1.9 in" },
                    "Height": { stringValue: "3.8 in" },
                    "Gram Weight": { stringValue: "14.1" },
                    "Label Panel Dimensions": { stringValue: "5.559 w x 2.344 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Size": { stringValue: "38-400" }
                }
            }
        },
        price: { doubleValue: 0.37 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create Natural Packer Bottle...");
    
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
