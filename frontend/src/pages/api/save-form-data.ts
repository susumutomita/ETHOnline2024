import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch"; // fetch APIを使って外部サービスと通信

// Sign ProtocolとAvailのエンドポイント
const SIGN_PROTOCOL_API_URL = "https://sign-protocol-api-url.com/sign";
const AVAIL_API_URL = "https://avail-network-url.com/store";

// データに署名する関数
async function signData(data: any) {
  const response = await fetch(SIGN_PROTOCOL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to sign data: ${response.statusText}`);
  }

  const signedData = await response.json();
  return signedData;
}

// Availにデータを保存する関数
async function saveToAvail(signedData: any) {
  const response = await fetch(AVAIL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signedData),
  });

  if (!response.ok) {
    throw new Error(`Failed to save data to Avail: ${response.statusText}`);
  }

  const result = await response.json();
  return result.cid; // AvailからCIDを取得
}

// メインのAPIハンドラー
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { formData, contractAddress } = req.body;

    if (!formData || !contractAddress) {
      return res
        .status(400)
        .json({ error: "Missing formData or contractAddress" });
    }

    try {
      // データに署名
      const dataToSign = {
        contractAddress,
        formData,
      };
      const signedData = await signData(dataToSign);
      console.log("Signed Data:", signedData);

      // Availにデータを保存
      const cid = await saveToAvail(signedData);
      console.log("Avail CID:", cid);

      // CIDをレスポンスとして返す
      res.status(200).json({ cid });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "Failed to save data using Sign Protocol and Avail" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
