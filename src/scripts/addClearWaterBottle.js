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
        sku: { stringValue: "PET-17-OZ-WTR-TE-CLR-NC" },
        slug: { stringValue: "17-oz-clear-pet-plastic-water-bottles-cap-not-included" },
        name: { stringValue: "17 oz Clear PET Plastic Water Bottles (Cap Not Included)" },
        brand: { stringValue: "PIF Packaging" },
        categories: { 
            arrayValue: { 
                values: [ { stringValue: "Bottles" } ] 
            } 
        },
        industry: { 
            arrayValue: { 
                values: [ 
                    { stringValue: "Beverage" },
                    { stringValue: "Food" }
                ] 
            } 
        },
        material: { stringValue: "PET" },
        materialGroup: { stringValue: "Plastic" },
        color: { stringValue: "Clear" },
        shape: { stringValue: "Round" },
        neckFinish: { stringValue: "Tamper Evident, PCO" },
        capSize: { stringValue: "28 mm" },
        palletQty: { integerValue: 4788 },
        capacity: { 
            mapValue: { 
                fields: { 
                    value: { integerValue: 17 }, 
                    unit: { stringValue: "oz" } 
                } 
            } 
        },
        imageUrl: { stringValue: "/images/catalog/4691b24-b_water_bottle_clear.jpg" },
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/4691b24-b_water_bottle_clear.jpg" },
              { stringValue: "/images/catalog/4691b24-b_water_bottle_bottle_bottom.jpg" }
            ]
          }
        },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "Cap Size: 28 mm PCO (sold separately)" },
                    { stringValue: "Weight: 24 grams" },
                    { stringValue: "Recyclable" }
                ]
            }
        },
        description: { stringValue: "Optimized for high-volume beverage distribution, the 17 oz Clear PET Water Bottle delivers a crystal-clear, lightweight, and highly economical packaging solution. Engineered with structural integrity in mind, it features distinct circumferential paneling at the base and shoulder to drastically improve rigidity and crush resistance during palletization and transit.\n\nCrafted from Recyclable Polyethylene Terephthalate (PET), this bottle offers the pristine clarity of glass without the risk of shattering. The generously proportioned, smooth central body serves as an ideal canvas for wraparound label application, instantly elevating brand visibility on crowded retail shelves.\n\nBuilt with a 28 mm PCO tamper-evident neck finish, this bottle seamlessly integrates with secure capping systems to guarantee product freshness and consumer safety.\n\n*Please note: Closure is sold separately. Bisphenol A (BPA) was not intentionally used in the manufacture of this item.*" },
        specifications: {
            mapValue: {
                fields: {
                    "Pallet Qty": { stringValue: "4788" },
                    "Capacity": { stringValue: "0.5 L (500 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "PET - Polyethylene Terephthalate" },
                    "Color": { stringValue: "Clear" },
                    "Shape": { stringValue: "Round" },
                    "Neck Finish": { stringValue: "Tamper-Evident, PCO" },
                    "Diameter": { stringValue: "2.53 in" },
                    "Height": { stringValue: "8.1 in" },
                    "Gram Weight": { stringValue: "24" },
                    "Label Panel Dimensions": { stringValue: "8.125 w x 2.500 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Size": { stringValue: "28 mm" }
                }
            }
        },
        price: { doubleValue: 0.35 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create Clear PET Water Bottle...");
    
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
