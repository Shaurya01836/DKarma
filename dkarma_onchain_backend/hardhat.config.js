require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "eduTestnet",
  networks: {
    eduTestnet: {
      url: "https://open-campus-codex-sepolia.drpc.org",
      chainId: 656476,
      accounts: [PRIVATE_KEY],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
