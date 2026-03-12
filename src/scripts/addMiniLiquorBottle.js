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
        sku: { stringValue: "PET-50-ML-RND-TE-CLR" },
        name: { stringValue: "50 ml Clear PET Plastic Mini Liquor Bottles (White Tamper-Evident Cap)" },
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
                    { stringValue: "Beverage" },
                    { stringValue: "Food" }
                ] 
            } 
        },
        material: { stringValue: "PET" },
        materialGroup: { stringValue: "Plastic" },
        color: { stringValue: "Clear" },
        shape: { stringValue: "Round" },
        neckFinish: { stringValue: "Tamper Evident, KERR" },
        capSize: { stringValue: "18-KERR" },
        capacity: { 
            mapValue: { 
                fields: { 
                    value: { integerValue: 50 }, 
                    unit: { stringValue: "ml" } 
                } 
            } 
        },
        imageUrl: { stringValue: "/images/catalog/71000-b_mini_liquor_bottle_with_cap.jpg" },
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/71000-b_mini_liquor_bottle_with_cap.jpg" },
              { stringValue: "/images/catalog/71000_mini_liquor_bottle.jpg" },
              { stringValue: "/images/catalog/18-kerwht_mini_liquor_cap.jpg" }
            ]
          }
        },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "Includes a White Tamper-Evident Cap" },
                    { stringValue: "Shatter-resistant" },
                    { stringValue: "Most common applications include liquor, syrups, additives and other sensitive items" }
                ]
            }
        },
        description: { stringValue: "Our 50 ml Clear PET Mini Liquor Bottle is the perfect presentation vessel for premium spirits, craft syrups, and specialty samplers. Engineered from high-clarity PET plastic, this shatter-resistant bottle offers the elegant transparency of glass combined with the lightweight durability essential for e-commerce and retail distribution. The classic round profile provides an optimal canvas for custom branding and labeling.\n\nThis complete packaging solution arrives paired with a white unlined KERR closure. The continuous thread cap features an integrated tamper-evident break-ring, instantly providing visible security and guaranteeing product integrity from the bottling line to the consumer's hands. Designed specifically for KERR neck finishes, this tight-sealing closure is ideal for preserving the quality and flavor profile of high-value liquid contents." },
        specifications: {
            mapValue: {
                fields: {
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
                    "Cap Style": { stringValue: "Continuous Thread" },
                    "Cap Color": { stringValue: "White" },
                    "Cap Size": { stringValue: "18-KERR" }
                }
            }
        },
        price: { doubleValue: 0.29 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create new Mini Liquor Bottle...");
    
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
