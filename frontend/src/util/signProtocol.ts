// signProtocol.ts

import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

// 環境に応じてプライベートキーを設定
const privateKey = "0x..."; // 環境変数などから取得するのが望ましい

const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.baseSepolia, // 使用するチェーンを指定
  account: privateKeyToAccount(privateKey), // オプション: フロントエンドでの使用時は省略可能
});

export const createAttestation = async (
  tokenContractAddress: string,
  tokenName: string,
  walletAddress: string,
) => {
  // サインプロトコルを使ったアテステーション作成のロジック
};

export default client;
