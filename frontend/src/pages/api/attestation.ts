import { NextApiRequest, NextApiResponse } from "next";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userAddress, schemaId } = req.body;

  if (!userAddress || !schemaId) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const privateKey = process.env.PRIVATE_KEY || "XXX";
    if (!privateKey) {
      return res.status(500).json({ error: "Private key not configured" });
    }

    const client = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.sepolia,
      account: privateKeyToAccount(`0x${privateKey}`),
    });
    console.log(client);
    console.log("Creating attestation for user:", userAddress);
    console.log("Schema ID:", schemaId);

    const resAttestation = await client.createAttestation({
      schemaId,
      data: {
        userAddress,
      },
      indexingValue: userAddress.toLowerCase(),
    });

    console.log("Attestation created:", resAttestation);
    return res.status(200).json({
      attestationId: resAttestation.attestationId,
      txHash: resAttestation.txHash,
    });
  } catch (error) {
    console.error("Error creating attestation:", error);
    return res.status(500).json({ error: "Failed to create attestation" });
  }
}
