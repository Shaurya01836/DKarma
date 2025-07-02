const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("FreelanceEscrow", function () {
  let FreelanceEscrow, ValidatorRegistry;
  let escrow, validatorRegistry;
  let dao, client, freelancer, validator;

  beforeEach(async function () {
    const signers = await ethers.getSigners();
    console.log("Signers count:", signers.length);

    // Ensure we have at least 4 accounts
    if (signers.length < 4) {
      throw new Error("You need at least 4 accounts: dao, client, freelancer, validator");
    }

    [dao, client, freelancer, validator] = signers;

    // Deploy ValidatorRegistry
    const ValidatorRegistryFactory = await ethers.getContractFactory("ValidatorRegistry");
    validatorRegistry = await ValidatorRegistryFactory.connect(dao).deploy(dao.address);
    await validatorRegistry.waitForDeployment();

    // Deploy FreelanceEscrow proxy
    const FreelanceEscrowFactory = await ethers.getContractFactory("FreelanceEscrow");
    escrow = await upgrades.deployProxy(
      FreelanceEscrowFactory,
      [dao.address, validatorRegistry.target],
      { initializer: "initialize" }
    );
    await escrow.waitForDeployment();

    // Add validator
    await validatorRegistry.connect(dao).addValidator(validator.address);
  });

  it("should create a task", async function () {
    const amount = ethers.parseEther("1");
    const deadline = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

    const tx = await escrow.connect(client).createTask(amount, deadline, { value: amount });
    await tx.wait();

    const task = await escrow.tasks(1);
    expect(task.client).to.equal(client.address);
    expect(task.amount).to.equal(amount);
    expect(task.status).to.equal(0); // TaskStatus.Open
  });

  it("should allow freelancer to accept the task", async function () {
    const amount = ethers.parseEther("1");
    const deadline = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

    await escrow.connect(client).createTask(amount, deadline, { value: amount });
    await escrow.connect(freelancer).acceptTask(1);

    const task = await escrow.tasks(1);
    expect(task.freelancer).to.equal(freelancer.address);
    expect(task.status).to.equal(1); // TaskStatus.Assigned
  });

  it("should allow freelancer to submit a milestone", async function () {
    const amount = ethers.parseEther("1");
    const deadline = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

    await escrow.connect(client).createTask(amount, deadline, { value: amount });
    await escrow.connect(freelancer).acceptTask(1);

    const uri = "ipfs://milestone-1";
    await escrow.connect(freelancer).submitMilestone(1, uri);

    const task = await escrow.tasks(1);
    expect(task.status).to.equal(2); // TaskStatus.Submitted
  });
});
