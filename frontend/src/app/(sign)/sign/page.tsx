"use client";

import { BrowserProvider, ethers } from "ethers";
import { useState } from "react";
import axios from "axios";

export default function SignPage() {
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [attestationId, setAttestationId] = useState("");
  const [txHash, setTxHash] = useState("");
  const [message, setMessage] = useState(
    "Please sign this message to verify your identity.",
  );
  const [error, setError] = useState<string | null>(null);

  const signMessage = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();

        const userAddress = await signer.getAddress();
        console.log("User Address:", userAddress);
        setAddress(userAddress);

        const sig = await signer.signMessage(message);
        setSignature(sig);

        const response = await axios.post("api/attestation", {
          userAddress,
          schemaId: "0x2d",
        });

        // サーバーからのレスポンスを反映
        setAttestationId(response.data.attestationId);
        setTxHash(response.data.txHash);
      } catch (error) {
        console.error("Error signing message:", error);
        setError("Error signing message");
      }
    } else {
      console.error("MetaMask is not installed");
      setError("MetaMask is not installed");
    }
  };

  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0 text-center">
      <h1>Sign Message and Create Attestation</h1>
      <p>Address: {address}</p>
      <p>Signature: {signature}</p>
      <p>Attestation ID: {attestationId}</p>
      <p>Transaction Hash: {txHash}</p>
      <p>{error && <span className="text-red-500">{error}</span>}</p>
      <button onClick={signMessage}>Sign with MetaMask</button>
    </div>
  );
}
