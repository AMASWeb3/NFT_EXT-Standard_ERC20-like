const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function main() {
  const [owner, otherConnect, anotherConnect] = await hre.ethers.getSigners();

  const erc721 = await hre.ethers.deployContract("MYNFT", [owner.address]);
  console.log("Deploying NFT Token...");
  const erc721Instance = await erc721.waitForDeployment();

  await erc721Instance.connect(owner).safeMint(otherConnect.address, 1);
  await erc721Instance.connect(owner).safeMint(anotherConnect.address, 2);

  console.log(`TeronNFT Deployed to ${erc721.target}`);
  console.log("Deployed ✅");

  //////////// Deploying Account Contract //////////

  const erc6551Account = await hre.ethers.deployContract("ERC6551Account");
  console.log("Deploying Account Contract...");
  const erc6551AccountInstance = await erc6551Account.waitForDeployment();

  console.log(`Teron Account Deployed to ${erc6551Account.target}`);

  //////////// Deploying TBA Registery Contract  /// //////

  const erc6551Registery = await hre.ethers.deployContract("ERC6551Registry");
  console.log("Deploying TBA Registery Contract...");
  const erc6551RegisteryInstance = await erc6551Registery.waitForDeployment();

  console.log(`Teron Registery Deployed to ${erc6551Registery.target}`);

  //////////// Creatig TBA Account //////////

  let data = await erc6551RegisteryInstance
    .connect(owner)
    .account(
      erc6551Account.target,
      8545,
      erc721.target,
      1,
      0
    );
 
  let account = await erc6551RegisteryInstance.connect(owner).createAccount(
    erc6551Account.target,
    8545,
    erc721.target,
    1,
    0,
    encodedBytes
  )
  console.log(`Teron Account Created to ${account}`);

  // await sleep(30 * 1000);

  // console.log("Verifying Contract...");
  // // // Verify the RektLock Contract
  // await hre.run("verify:verify", {
  //   address: erc721.target,
  //   constructorArguments: [owner.address],
  // });

  // console.log("Verified Contract ⭐️");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
