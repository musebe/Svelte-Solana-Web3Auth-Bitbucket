// src/lib/authFunctions.ts
import { initializeWeb3Auth } from './auth'; // Import the initialize function
import { SolanaWallet } from "@web3auth/solana-provider";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { Web3Auth } from '@web3auth/modal';

// Declare web3auth at the module scope
let web3auth: Web3Auth;

// Initialize web3auth asynchronously
async function ensureWeb3AuthInitialized() {
    if (!web3auth) {
        const result = await initializeWeb3Auth();
        if (!result) {
            throw new Error("Failed to initialize Web3Auth");
        }
        web3auth = result.web3auth;
    }
}

/**
 * Initializes the Web3Auth modal.
 */
export async function initWeb3Auth(): Promise<void> {
    await ensureWeb3AuthInitialized();
    if (!web3auth.provider) {
        console.log("Initializing Web3Auth modal...");
        await web3auth.initModal();
        console.log("Web3Auth modal initialized.");
    } else {
        console.log("Web3Auth modal already initialized.");
    }
}


/**
 * Connects to the user's wallet and retrieves user info.
 */


export async function connectWallet() {
    await ensureWeb3AuthInitialized();
    console.log("Connecting to wallet...");
    const provider = await web3auth.connect();
    if (!provider) {
        console.error("Provider is null. Failed to connect wallet.");
        return null;
    }

    const solanaWallet = new SolanaWallet(provider);
    let userInfo = null;
    try {
        userInfo = await web3auth.getUserInfo();
    } catch (error) {
        console.error("Error retrieving user info:", error);
    }
    return { solanaWallet, userInfo };
}

/**
 * Logs out the current user.
 */
export async function logout(): Promise<void> {
    await ensureWeb3AuthInitialized();
    await web3auth.logout();
    console.log("Logged out successfully.");
}

/**
 * Fetches the account balance of the connected wallet.
 */

export async function getAccountBalance(wallet: SolanaWallet): Promise<number> {
    await ensureWeb3AuthInitialized();
    console.log("getAccountBalance: Function called");

    if (!wallet) {
        console.error("getAccountBalance: Wallet is not provided");
        throw new Error("Wallet is not provided.");
    }

    console.log("getAccountBalance: Wallet provider is available");

    try {
        const accounts = await wallet.requestAccounts();
        console.log("getAccountBalance: Accounts retrieved", accounts);

        const connectionConfig = await wallet.request({
            method: "solana_provider_config",
            params: [],
        }) as { rpcTarget: string };
        console.log("getAccountBalance: Connection config retrieved", connectionConfig);

        const connection = new Connection(connectionConfig.rpcTarget);
        const balance = await connection.getBalance(new PublicKey(accounts[0]));
        console.log("getAccountBalance: Balance fetched", balance);

        const adjustedBalance = balance / LAMPORTS_PER_SOL;
        console.log("getAccountBalance: Adjusted balance", adjustedBalance);

        return adjustedBalance;
    } catch (error) {
        console.error("getAccountBalance: Error occurred", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}


/**
 * Initiates login process using Bitbucket as a provider.
 */
export async function loginWithBitbucket() {
    await ensureWeb3AuthInitialized();
    try {
        await web3auth.connectTo('openlogin', {
            loginProvider: 'jwt',
            extraLoginOptions: {
                domain: 'https://dev-i8bj6jw3t2bw168f.us.auth0.com',
                verifierIdField: 'sub',
                connection: 'bitbucket',
            },
        });

        // const user = await web3auth.getUserInfo();
    } catch (error) {
        console.error('Error logging in with Bitbucket:', error);
    }
}


/**
 * Retrieves the user information of the connected user.
 */
export async function getUserInfo() {
    await ensureWeb3AuthInitialized();
    console.log("Retrieving user information...");
    try {
        const userInfo = await web3auth.getUserInfo();
        console.log("User information retrieved:", userInfo);
        return userInfo;
    } catch (error) {
        console.error("Error retrieving user information:", error);
        throw error; // or return null, based on how you want to handle errors
    }
}