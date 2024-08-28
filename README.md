# BlockFeedback

![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/susumutomita/ETHOnline2024)
![GitHub top language](https://img.shields.io/github/languages/top/susumutomita/ETHOnline2024)
![GitHub pull requests](https://img.shields.io/github/issues-pr/susumutomita/ETHOnline2024)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/susumutomita/ETHOnline2024)
![GitHub repo size](https://img.shields.io/github/repo-size/susumutomita/ETHOnline2024)

## Overview

BlockFeedback is a blockchain-based real-time feedback and reward system designed for retail environments, such as convenience stores and shops. This decentralized platform allows customers to provide instant feedback on their shopping experiences and receive immediate rewards like tokens or discount coupons. By leveraging blockchain technology, BlockFeedback ensures data integrity and transparency while protecting customer privacy, enhancing consumer engagement and the quality of feedback.

## Features

- **Real-Time Feedback Collection:** Customers can scan a QR code in-store to provide feedback instantly through a mobile-friendly interface.
- **Instant Rewards:** After submitting feedback, customers receive tokens or discount coupons that can be used for future purchases.
- **Secure Data Storage:** All feedback is securely stored on the blockchain, ensuring tamper-proof and verifiable data.
- **Privacy Protection:** By using zkTLS and Mina Protocol, BlockFeedback ensures that customer identities and feedback remain private.
- **Cross-Chain Compatibility:** LayerZero is used for seamless cross-chain data sharing and reward distribution.
- **User-Friendly Authentication:** Integration with Web3Auth allows easy, non-custodial login using social media accounts.

## Architecture

BlockFeedback is composed of several key components:

1. **Frontend**: Built with Next.js, providing a smooth and responsive user experience for feedback submission and reward collection.
2. **Backend**: Smart contracts developed with Foundry manage reward issuance and secure feedback data storage on the blockchain.
3. **Privacy and Security**: zkTLS ensures secure and encrypted data transmission, protecting customer data.
4. **Blockchain Network**: Mina Protocol provides lightweight blockchain capabilities for secure, anonymous feedback collection.
5. **Cross-Chain Communication**: LayerZero enables data sharing and reward issuance across various blockchain networks, ensuring scalability.
6. **Authentication**: Web3Auth offers a non-custodial, easy-to-use authentication mechanism, allowing secure social media-based login.

## How to Run the Project

### Prerequisites

- Node.js and npm installed
- Foundry for smart contract development
- A compatible web3 wallet (e.g., MetaMask)
- Next.js installed

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/susumutomita/ETHOnline2024.git
   cd ETHOnline2024
   ```

2. **Install dependencies:**

   ```bash
   make install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the necessary environment variables for API keys and blockchain networks.

   ```plaintext
   NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id
   NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=your_web3auth_client_id
   ```

4. **Start the development server:**

   ```bash
   make start
   ```

   The app should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

- **Providing Feedback:** Users can scan the QR code in-store to access the feedback interface. They log in using their social media account via Web3Auth and submit feedback.
- **Receiving Rewards:** Upon submitting feedback, the smart contract issues tokens or coupons directly to the user’s wallet, usable for future purchases.
- **Analytics Dashboard:** Store owners can access a dashboard to view and analyze feedback, facilitating data-driven decision-making.

## Technologies Used

- **Next.js:** For building the frontend interface.
- **Foundry:** For developing and deploying smart contracts.
- **zkTLS:** For secure, encrypted data communication.
- **Mina Protocol:** For privacy-preserving feedback collection.
- **LayerZero:** For cross-chain data sharing and reward distribution.
- **Web3Auth:** For non-custodial authentication and easy login.

## Future Roadmap

1. **Scalability Improvements:** Optimize the platform for higher feedback volumes.
2. **Expansion to More Retail Chains:** Broaden the deployment of BlockFeedback to more retail partners.
3. **Enhanced Analytics:** Introduce advanced features for deeper insights into customer feedback.
4. **Mobile App Development:** Create native mobile applications for a seamless user experience.

## Contributing

We welcome contributions to improve BlockFeedback. Please fork the repository and submit a pull request with your changes.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## The Team

- [Susumu Tomita](https://susumutomita.netlify.app/) - Full Stack Developer
