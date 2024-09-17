import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");


async function main () {
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    const [signer] = await ethers.getSigners();

    
    
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

    const USDC_Contract = await ethers.getContractAt("IERC20", USDC);
    const DAI_Contract = await ethers.getContractAt("IERC20", DAI);

    const ROUTER = await ethers.getContractAt("IUniswapV2Router", ROUTER_ADDRESS);

    

    // const TOKEN_Holder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621"
    // await helpers.impersonateAccount(TOKEN_Holder);
    // const impersonatedSigner = await ethers.getSigner(TOKEN_Holder);

    const amountA = ethers.parseUnits("2000");
    const amountB =  ethers.parseUnits("1000");

    await USDC_Contract.approve(ROUTER, amountA);
    await DAI_Contract.approve(ROUTER, amountB);

    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    const tx = await ROUTER.addLiquidity(
        USDC_Contract,
        DAI_Contract,
        amountA,
        amountB,
        0, 
        0, 
        signer,
        deadline
      );
    
      await tx.wait();
      console.log('Liquidity added:', tx.hash);
}

main().catch( (error) => {
    console.error(error);
    process.exitCode = 1;
})