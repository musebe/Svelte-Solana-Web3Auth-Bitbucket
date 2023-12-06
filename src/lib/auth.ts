// Imports necessary modules for Web3 authentication and Solana blockchain interaction.
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";


// Configuration for the Solana blockchain, specifying chain details and connection information.
export const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.SOLANA,
    chainId: "0x3", // Mainnet
    rpcTarget: "https://summer-frosty-friday.solana-devnet.quiknode.pro/5430f85cfb9a90ac2763131b24d8a746f2d18825",
    displayName: "Sapphire Devnet",
    blockExplorer: "https://explorer.solana.com",
    ticker: "SOL",
    tickerName: "Solana",
};


// Client ID for the application, used in authentication processes.
export const clientId = "BAxMb2KhVmD4HMcZFa_lir3rFiMZlSuEVMZ0jeE0WYJIfNPGnxT0ZOxyo3ZhSc-JpEz5InPziaaJXgbIGU8EUz0";


// Initializes Web3Auth with the specified client ID and blockchain configuration.
export const web3auth = new Web3Auth({
    clientId: clientId,
    web3AuthNetwork: "sapphire_devnet",
    chainConfig: chainConfig
});


// Sets up a private key provider for Solana, using the blockchain configuration.
export const privateKeyProvider = new SolanaPrivateKeyProvider({
    config: { chainConfig },
});

// Logs the setup completion of the private key provider.
console.log('Private Key Provider set up');

// Configures the OpenloginAdapter with specific settings for user authentication, including UX mode and login configurations.
export const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
        uxMode: "popup",
        loginConfig: {
            jwt: {
                verifier: "svelte-solana",
                typeOfLogin: "jwt",
                clientId: "tAxzHQhxFyOMYHkoauwt0L9CfrY7okUe",
            },
        },
    },
    privateKeyProvider,
});

// Logs the configuration completion of the Openlogin Adapter.
console.log('Openlogin Adapter configured');


// Final step to link the Web3Auth instance with the configured Openlogin Adapter.
web3auth.configureAdapter(openloginAdapter);
