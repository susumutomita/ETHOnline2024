export const config = {
  title: "BlockFeedback",
  description:
    "BlockFeedback is a blockchain-based real-time feedback collection platform for retail environments, ensuring secure and tamper-proof data with instant rewards.",
  isLocal: process.env.NEXT_PUBLIC_ENV === "development",
  valueSentences: [
    "Collect secure and real-time feedback using blockchain technology",
    "Enhance customer engagement with instant rewards",
    "Analyze feedback data securely and improve customer satisfaction",
  ],
  about: [
    {
      title: "What is BlockFeedback?",
      description:
        "BlockFeedback is a decentralized platform designed to collect real-time feedback in retail settings using blockchain technology. It ensures data integrity and customer privacy while providing instant rewards to customers for their feedback.",
    },
    {
      title: "How does it work?",
      description:
        "Customers provide feedback using BlockFeedback, which is then securely stored on the blockchain. The feedback is tamper-proof and verifiable, and customers receive tokens or coupons instantly for their input.",
    },
    {
      title: "Notes on security and privacy",
      description:
        "BlockFeedback uses zero-knowledge proofs and the Mina Protocol to ensure customer identities remain private while verifying the integrity of feedback data.",
    },
    {
      title: "Disclaimer",
      description:
        "BlockFeedback is currently in a beta phase and is provided as-is without any guarantees. Use it at your own risk.",
    },
  ],
  steps: [
    {
      title: "Provide Feedback",
      description:
        "Customers provide feedback on their shopping experience in real-time using the BlockFeedback platform.",
    },
    {
      title: "Earn Rewards",
      description:
        "Customers receive tokens or discount coupons instantly for their feedback, enhancing engagement.",
    },
    {
      title: "Analyze Data",
      description:
        "Stores can analyze the collected feedback data to optimize product placement, marketing strategies, and overall customer satisfaction.",
    },
  ],
};
