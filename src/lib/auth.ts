// src/lib/auth.ts
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { SolanaWallet } from "@web3auth/solana-provider";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const web3auth = new Web3Auth({
    clientId: "BAxMb2KhVmD4HMcZFa_lir3rFiMZlSuEVMZ0jeE0WYJIfNPGnxT0ZOxyo3ZhSc-JpEz5InPziaaJXgbIGU8EUz0",
    web3AuthNetwork: "cyan",
    chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.SOLANA,
        chainId: "0x3", // Mainnet
        rpcTarget: "https://summer-frosty-friday.solana-devnet.quiknode.pro/5430f85cfb9a90ac2763131b24d8a746f2d18825",
        displayName: "Sapphire Devnet",
        blockExplorer: "https://explorer.solana.com",
        ticker: "SOL",
        tickerName: "Solana",
    },
});

export async function initWeb3Auth(): Promise<void> {
    console.log("Initializing Web3Auth modal...");
    await web3auth.initModal();
    console.log("Web3Auth modal initialized.");
}

export async function connectWallet(): Promise<SolanaWallet> {
    console.log("Connecting to wallet...");
    const provider = await web3auth.connect();
    console.log("Wallet connected.");

    const solanaWallet = new SolanaWallet(provider);
    console.log("SolanaWallet instance created.");

    try {
        const user = await web3auth.getUserInfo();
        console.log("User info retrieved:", user);
    } catch (error) {
        console.error("Error retrieving user info:", error);
    }

    return solanaWallet;
}


// logout function
export async function logout(): Promise<void> {
    await web3auth.logout();
    console.log("Logged out successfully.");
}
export async function getAccountBalance(solanaWallet: SolanaWallet): Promise<number> {
    // Get user's Solana public address
    const accounts = await solanaWallet.requestAccounts();

    const connectionConfig = await solanaWallet.request({
        method: "solana_provider_config",
        params: [],
    });

    const connection = new Connection(connectionConfig.rpcTarget);

    // Fetch the balance for the specified public key
    const balance = await connection.getBalance(new PublicKey(accounts[0]));
    return balance / LAMPORTS_PER_SOL; // Convert balance from lamports to SOL
}