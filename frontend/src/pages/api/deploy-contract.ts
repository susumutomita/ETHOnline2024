import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { tokenName, price } = req.body;

    try {
      // プロバイダーの設定（適切なRPCエンドポイントを指定する必要があります）
      const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
      const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

      // ABIとバイトコードを読み込み
      const tokenABI = ["..."]; // 実際のトークンABIを挿入
      const tokenBytecode = "0x..."; // 実際のトークンバイトコードを挿入

      // コントラクトファクトリーを作成
      const TokenFactory = new ethers.ContractFactory(
        tokenABI,
        tokenBytecode,
        signer,
      );

      // コントラクトのデプロイ
      const tokenContract = await TokenFactory.deploy(tokenName, price);
      await tokenContract.waitForDeployment(); // デプロイ完了を待機

      // デプロイされたコントラクトのアドレスを返す
      res.status(200).json({ contractAddress: tokenContract.target }); // target を address の代わりに使用
    } catch (error) {
      console.error("Error deploying contract:", error);
      res.status(500).json({ error: "Failed to deploy contract" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
