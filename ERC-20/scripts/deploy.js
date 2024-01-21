
const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function main() {
  
  const [owner] = await hre.ethers.getSigners();

  const erc20 = await hre.ethers.deployContract("TeronToken", [owner.address]);
  console.log("Deploying your Token...")
  await erc20.waitForDeployment();

  console.log(
    `TeronToken Deployed to ${erc20.target}`
  );

  console.log("Deployed ✅");

  await sleep(30 * 1000);
  console.log("Verifying Contract...");
  // // Verify the RektLock Contract
  await hre.run("verify:verify", {
    address: erc20.target,
    constructorArguments: [owner.address],
  });

  console.log("Verified Contract ⭐️");
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
