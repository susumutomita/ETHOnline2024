// schemaCreation.ts

import client from "@/util/signProtocol";

export const createSchema = async () => {
  try {
    const res = await client.createSchema({
      name: "Feedback Form Schema",
      data: [
        { name: "contractDetails", type: "string" },
        { name: "signer", type: "address" },
      ],
    });

    console.log("Schema created:", res);
    return res;
  } catch (error) {
    console.error("Error creating schema:", error);
  }
};
