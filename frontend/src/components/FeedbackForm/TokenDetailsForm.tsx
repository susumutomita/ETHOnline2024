import React from "react";
import { TokenDetailsFormProps } from "@/components/types";

export default function TokenDetailsForm({
  tokenName,
  setTokenName,
  price,
  setPrice,
  readonly = false,
}: TokenDetailsFormProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Token Details</h2>
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
    </div>
  );
}
