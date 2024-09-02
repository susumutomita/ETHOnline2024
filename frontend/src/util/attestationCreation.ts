// attestationCreation.ts

import client from "@/util/signProtocol";

export const createAttestation = async (
  schemaId: any,
  tokenContractAddress: any,
  indexingValue: string, // 新しく引数として追加
) => {
  try {
    const attestationData = {
      contractDetails: "Feedback Form for Token Association",
      signer: tokenContractAddress,
    };

    // indexingValueはここで直接渡す
    const res = await client.createAttestation({
      schemaId,
      data: attestationData,
      indexingValue: indexingValue, // このプロパティを追加
    });

    console.log("Attestation created:", res);
    return res;
  } catch (error) {
    console.error("Error creating attestation:", error);
  }
};
