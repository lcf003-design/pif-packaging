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
        slug: { stringValue: "4-oz-amber-pet-plastic-boston-round-bottles-cap-not-included" },
        name: { stringValue: "4 oz Amber PET Plastic Boston Round Bottles (Cap Not Included)" },
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
                    { stringValue: "Personal Health & Beauty" },
                    { stringValue: "Industrial Chemical" }
                ] 
            } 
        },
        material: { stringValue: "PET" },
        materialGroup: { stringValue: "Plastic" },
        color: { stringValue: "Amber" },
        shape: { stringValue: "Round" },
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
        imageUrl: { stringValue: "/images/catalog/3371b05-b_boston_round_amber_4oz.jpg" },
        images: {
          arrayValue: {
            values: [
              { stringValue: "/images/catalog/3371b05-b_boston_round_amber_4oz.jpg" }
            ]
          }
        },
        features: {
            arrayValue: {
                values: [
                    { stringValue: "Cap Size: 24-410 (sold separately)" },
                    { stringValue: "UV Resistant, FDA Food Contact Compliant" },
                    { stringValue: "BPA NI (Not Intentionally Added)*" }
                ]
            }
        },
        description: { stringValue: "A quintessential staple in the packaging industry, our 4 oz Amber PET Boston Round Bottle delivers timeless, reliable performance across pharmaceutical, chemical, and laboratory applications. The iconic Boston Round profile—characterized by its rounded shoulders and sturdy base—has been a trusted standard for decades, offering exceptional stability and ease of handling.\n\nManufactured from shatter-resistant PET plastic, this vessel provides a lightweight alternative to traditional glass without compromising on visual appeal. The deep amber tint is specifically formulated to filter out harmful UV wavelengths, making it the perfect protective enclosure for light-sensitive materials, essential oils, and specialized liquid formulations. Featuring a versatile 24-410 continuous thread neck finish, it easily accommodates a wide array of fine mist sprayers, pumps, or standard caps.\n\n*Please note: Closure is sold separately. Bisphenol A (BPA) was not intentionally used in the manufacture of this item.*" },
        specifications: {
            mapValue: {
                fields: {
                    "Case Qty": { stringValue: "500" },
                    "Pallet Qty": { stringValue: "10000" },
                    "Capacity": { stringValue: "4 oz (120 ml)" },
                    "Material Group": { stringValue: "Plastics" },
                    "Material Type": { stringValue: "PET - Polyethylene Terephthalate" },
                    "Color": { stringValue: "Amber" },
                    "Shape": { stringValue: "Round" },
                    "Neck Finish": { stringValue: "Continuous Thread" },
                    "Diameter": { stringValue: "1.8 in" },
                    "Height": { stringValue: "4.305 in" },
                    "Gram Weight": { stringValue: "14.73" },
                    "Label Panel Dimensions": { stringValue: "5.404 w x 2.625 h" },
                    "Label Panel Shape": { stringValue: "Rectangular" },
                    "Cap Size": { stringValue: "24-410" }
                }
            }
        },
        price: { doubleValue: 0.35 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;
    
    console.log("Sending REST Request to Firestore to create 4 oz Amber Boston Round...");
    
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
