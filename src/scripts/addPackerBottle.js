const { GoogleAuth } = require("google-auth-library");
const fetch = require("node-fetch");

async function main() {
  const projectId = "packaging-catalog";

  if (!require("fs").existsSync("./service-account.json")) {
    console.error("service-account.json not found in root.");
    process.exit(1);
  }

  const auth = new GoogleAuth({
    keyFile: "./service-account.json",
    scopes: ["https://www.googleapis.com/auth/datastore"],
  });

  try {
    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const token = tokenResponse.token;

    const payload = {
      fields: {
        sku: { stringValue: "3369B01ABR" },
        name: {
          stringValue:
            "2 oz Dark Amber PET Plastic Wide Mouth Packer Bottles (Black Screw Top Cap) - 3369B01ABR",
        },
        brand: { stringValue: "PIF Packaging" },
        categories: {
          arrayValue: {
            values: [{ stringValue: "Bottles" }],
          },
        },
        industry: {
          arrayValue: {
            values: [
              { stringValue: "Pharma, Nutraceuticals & Healthcare" },
              { stringValue: "Personal Health & Beauty" },
            ],
          },
        },
        material: { stringValue: "PET" },
        materialGroup: { stringValue: "Plastic" },
        color: { stringValue: "Amber" },
        shape: { stringValue: "Packer" },
        neckFinish: { stringValue: "Continuous Thread" },
        capacity: {
          mapValue: {
            fields: {
              value: { integerValue: 2 },
              unit: { stringValue: "oz" },
            },
          },
        },
        imageUrl: {
          stringValue: "/images/catalog/3369b01abr_packer_amber.jpg",
        },
        description: {
          stringValue:
            "Premium 2 oz dark amber PET plastic wide mouth packer bottle with black continuous thread screw top closure. Ideal for light-sensitive pharmaceuticals, vitamins, supplements, and wellness products.",
        },
        price: { doubleValue: 0.51 },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() },
      },
    };

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/products`;

    console.log(
      "Sending REST Request to Firestore to create new Pack Bottle...",
    );

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      console.log(
        "SUCCESS! Firestore Document CREATED via REST API.",
        data.name,
      );
      // The last segment of the name is the ID
      const parts = data.name.split("/");
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
