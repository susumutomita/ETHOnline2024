"use client";

import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { BrowserProvider, Contract } from "ethers";
import { abi, contractAddresses } from "../../app/constants/contract";

export default function GenerateQRCode() {
  const [formId, setFormId] = useState<number | null>(null);
  const [qrCodeURL, setQrCodeURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormId = async () => {
      if (!window.ethereum) {
        setError("MetaMask is not installed!");
        return;
      }

      try {
        setLoading(true);
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();

        let selectedAddress = "";
        switch (network.chainId) {
          case BigInt(534351): // Scroll Testnet ID
            selectedAddress = contractAddresses.scrollTestnet;
            break;
          case BigInt(11155111): // Scroll Testnet ID
            selectedAddress = contractAddresses.sepolia;
            break;
          case BigInt(97): // BNB Testnet ID
            selectedAddress = contractAddresses.bnbTestnet;
            break;
          case BigInt(84532): // Base Sepolia Testnet ID
            selectedAddress = contractAddresses.baseSepoliaTestnet;
            break;
          default:
            setError("Unsupported network");
            setLoading(false);
            return;
        }

        const contract = new Contract(selectedAddress, abi, signer);

        // 最新のフォームIDを取得
        const latestFormId = await contract.getFeedbackIdCounter();
        setFormId(latestFormId);

        // QRコードに埋め込むURLを生成
        const url = `${window.location.origin}/feedback/${latestFormId}`;
        setQrCodeURL(url);
      } catch (error: any) {
        console.error("Error fetching form ID:", error);
        setError(`Failed to fetch form ID: ${error.message || error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFormId();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Generate Feedback QR Code</h1>

      {error && <p className="text-red-600">{error}</p>}
      {loading && <p>Loading...</p>}

      {qrCodeURL && (
        <div className="flex flex-col items-center">
          <QRCodeCanvas
            value={qrCodeURL}
            size={256}
            bgColor={"#FF0000"}
            fgColor={"#FFC0CB"}
            level={"L"}
            includeMargin={false}
            imageSettings={{
              src: "/favicon.ico",
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
          <p className="mt-4">Scan this QR code to access the feedback form</p>
        </div>
      )}
    </div>
  );
}
