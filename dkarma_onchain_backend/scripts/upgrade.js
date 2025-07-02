// scripts/upgrade.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  // Replace with your actual proxy address
  const proxyAddress = "0xYourDeployedProxyAddressHere";

  console.log("Starting upgrade for FreelanceEscrow...");

  // Get the new version of the contract (updated logic)
  const FreelanceEscrow = await ethers.getContractFactory("FreelanceEscrow");

  const upgraded = await upgrades.upgradeProxy(proxyAddress, FreelanceEscrow);

  console.log("✅ Upgrade successful. Proxy is still at:", upgraded.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Upgrade failed:", error);
    process.exit(1);
  });
