const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("FileHashStorage");
  const upload = await Upload.deploy();

  await upload.waitForDeployment();

console.log("Library deployed to:", await upload.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x425a02f6FC90B89d56F3f7f57b019F9CE25147F8