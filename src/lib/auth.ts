// src/lib/auth.ts
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { SolanaWallet,SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";


const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.SOLANA,
    chainId: "0x3", // Mainnet
    rpcTarget: "https://summer-frosty-friday.solana-devnet.quiknode.pro/5430f85cfb9a90ac2763131b24d8a746f2d18825",
    displayName: "Sapphire Devnet",
    blockExplorer: "https://explorer.solana.com",
    ticker: "SOL",
    tickerName: "Solana",
};

const clientId = "BAxMb2KhVmD4HMcZFa_lir3rFiMZlSuEVMZ0jeE0WYJIfNPGnxT0ZOxyo3ZhSc-JpEz5InPziaaJXgbIGU8EUz0";


const web3auth = new Web3Auth({
    clientId: clientId,
    web3AuthNetwork: "sapphire_devnet",
    chainConfig: chainConfig
});

const privateKeyProvider = new SolanaPrivateKeyProvider({
    config: { chainConfig },
});

console.log('Private Key Provider set up');

const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
        uxMode: "redirect",
        loginConfig: {
            jwt: {
                verifier: "svelte-solana", // Your verifier name
                typeOfLogin: "jwt",
                clientId: "tAxzHQhxFyOMYHkoauwt0L9CfrY7okUe", // Your Auth0 Client ID
            },
        },
    },
    privateKeyProvider,
});

console.log('Openlogin Adapter configured');

web3auth.configureAdapter(openloginAdapter);


export async function initWeb3Auth(): Promise<void> {
    console.log("Initializing Web3Auth modal...");
    await web3auth.initModal();
    console.log("Web3Auth modal initialized.");
}

export async function connectWallet(): Promise<SolanaWallet | null> {
    console.log("Connecting to wallet...");
    const provider = await web3auth.connect();

    if (!provider) {
        console.error("Provider is null. Failed to connect wallet.");
        return null; // Return null if the provider is not available
    }

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


// Function to get account balance
export async function getAccountBalance(): Promise<number> {
    console.log("Fetching account balance...");

    // Ensure the wallet is connected
    if (!web3auth.provider) {
        throw new Error("Wallet is not connected.");
    }

    const solanaWallet = new SolanaWallet(web3auth.provider);

    // Get user's Solana public address
    const accounts = await solanaWallet.requestAccounts();

    const connectionConfig = await solanaWallet.request({
        method: "solana_provider_config",
        params: [],
    }) as { rpcTarget: string }; // Type assertion here

    const connection = new Connection(connectionConfig.rpcTarget);

    // Fetch the balance for the specified public key
    const balance = await connection.getBalance(new PublicKey(accounts[0]));

    console.log(`Account balance: ${balance / LAMPORTS_PER_SOL} SOL`);

    // Return balance in SOL (not in lamports)
    return balance / LAMPORTS_PER_SOL;
}

export async function loginWithBitbucket() {
    console.log('Attempting to login with Bitbucket...');
    try {
        await web3auth.connectTo('openlogin', {
            loginProvider: 'jwt',
            extraLoginOptions: {
                domain: 'https://dev-i8bj6jw3t2bw168f.us.auth0.com',
                verifierIdField: 'sub',
                connection: 'bitbucket',
            },
        });

        const user = await web3auth.getUserInfo();
        console.log('User info', user);
        console.log('Login with Bitbucket successful');
    } catch (error) {
        console.error('Error logging in with Bitbucket:', error);
    }
}







//TO-DO

// - Redirect to /dashboard on login 
// - Update Readme
// - Get Transactions via Bitbucket Login
// - Record a gif showing the working 
// - Deploy To vercel 