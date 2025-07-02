const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying contracts with:", deployer.address);

  const dao = deployer.address;

  // ✅ Step 1: Deploy ValidatorRegistry (standard contract)
  const ValidatorRegistry = await ethers.getContractFactory("ValidatorRegistry");
  const validatorRegistry = await ValidatorRegistry.deploy(dao);
  await validatorRegistry.waitForDeployment(); // <-- ✅ correct way
  const validatorRegistryAddress = await validatorRegistry.getAddress();
  console.log("✅ ValidatorRegistry deployed at:", validatorRegistryAddress);

  // ✅ Step 2: Deploy FreelanceEscrow (proxy)
  const FreelanceEscrow = await ethers.getContractFactory("FreelanceEscrow");
  const freelanceEscrow = await upgrades.deployProxy(
    FreelanceEscrow,
    [dao, validatorRegistryAddress],
    { initializer: "initialize" }
  );

  await freelanceEscrow.waitForDeployment();
  const proxyAddress = await freelanceEscrow.getAddress();
  console.log("✅ FreelanceEscrow Proxy deployed at:", proxyAddress);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
