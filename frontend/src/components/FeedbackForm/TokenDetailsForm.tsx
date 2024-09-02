import React, { useState, useEffect } from "react";
import { TokenDetailsFormProps } from "@/components/types";
import { ethers } from "ethers";

export default function TokenDetailsForm({
  tokenName,
  setTokenName,
  price,
  setPrice,
  readonly = false,
  setTokenContractAddress, // 新規追加
}: TokenDetailsFormProps & {
  setTokenContractAddress?: (address: string) => void;
}) {
  const [useExistingToken, setUseExistingToken] = useState(false);
  const [existingTokenAddresses, setExistingTokenAddresses] = useState<
    string[]
  >([]);

  useEffect(() => {
    // ウォレットアドレスから既存のトークンアドレスを取得
    const fetchExistingTokens = async () => {
      // ここにトークンアドレスの取得ロジックを追加（ダミーデータで代用）
      setExistingTokenAddresses(["0xExistingToken1", "0xExistingToken2"]);
    };

    fetchExistingTokens();
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Token Details</h2>
      <div className="mt-4">
        <label>
          <input
            type="radio"
            name="token-option"
            value="new"
            checked={!useExistingToken}
            onChange={() => setUseExistingToken(false)}
            disabled={readonly}
          />
          新しいトークンを発行
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name="token-option"
            value="existing"
            checked={useExistingToken}
            onChange={() => setUseExistingToken(true)}
            disabled={readonly}
          />
          既存のトークンを使用
        </label>
      </div>

      {!useExistingToken ? (
        <>
          <input
            type="text"
            value={tokenName}
            onChange={(e) => setTokenName && setTokenName(e.target.value)}
            placeholder="Token Name"
            className="p-2 border rounded w-full mb-4"
            disabled={readonly}
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice && setPrice(e.target.value)}
            placeholder="Price in ETH"
            className="p-2 border rounded w-full mb-4"
            disabled={readonly}
          />
        </>
      ) : (
        <select
          onChange={(e) =>
            setTokenContractAddress && setTokenContractAddress(e.target.value)
          }
          className="p-2 border rounded w-full mt-4"
          disabled={readonly}
        >
          <option value="">Select an existing token</option>
          {existingTokenAddresses.map((address) => (
            <option key={address} value={address}>
              {address}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
