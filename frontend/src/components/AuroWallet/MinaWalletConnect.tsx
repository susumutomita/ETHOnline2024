"use client";
import React, { useState, useEffect } from "react";
import MinaModal from "@/components/AuroWallet/MinaModal";

declare global {
  interface Window {
    mina?: any;
  }
}

const MinaWalletConnect = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);

  const connectMinaWallet = () => {
    if (typeof window !== "undefined" && window.mina) {
      window.mina
        .requestAccounts()
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnectModalOpen(false); // 接続成功でモーダルを閉じる
          }
        })
        .catch((error: Error) => {
          setErrorMessage("Failed to connect to Auro Wallet: " + error.message);
        });
    } else {
      setErrorMessage("Auro Wallet is not installed.");
    }
  };

  const disconnectMinaWallet = () => {
    setAccount(null);
    setErrorMessage("");
    setIsDisconnectModalOpen(false); // 切断モーダルを閉じる
  };

  return (
    <div>
      {account ? (
        <button
          onClick={() => setIsDisconnectModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all"
        >
          {`${account.slice(0, 6)}...${account.slice(-4)}`}
        </button>
      ) : (
        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all"
        >
          Connect Auro Wallet
        </button>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* 接続モーダル */}
      <MinaModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConfirm={connectMinaWallet}
        title="Connect to Auro Wallet"
        message="Please connect to your Auro Wallet to continue."
        confirmLabel="Connect"
      />

      {/* 切断モーダル */}
      <MinaModal
        isOpen={isDisconnectModalOpen}
        onClose={() => setIsDisconnectModalOpen(false)}
        onConfirm={disconnectMinaWallet}
        title="Disconnect Auro Wallet"
        message="Are you sure you want to disconnect from your Auro Wallet?"
        confirmLabel="Disconnect"
      />
    </div>
  );
};

export default MinaWalletConnect;
