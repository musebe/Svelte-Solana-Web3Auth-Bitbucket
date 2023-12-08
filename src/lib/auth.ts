// Define an asynchronous function to handle the dynamic imports and initialization

import type * as Web3AuthBase from '@web3auth/base';
export async function initializeWeb3Auth() {
    try {
        // Dynamically import the necessary modules
        const Web3AuthModule = await import('@web3auth/modal');
        const SolanaProvider = await import('@web3auth/solana-provider');
        const OpenloginAdapterModule = await import('@web3auth/openlogin-adapter');

        // Extract the needed classes from the imported modules
        const { Web3Auth } = Web3AuthModule;
        const { SolanaPrivateKeyProvider } = SolanaProvider;
        const { OpenloginAdapter } = OpenloginAdapterModule;

        // Define your chain configuration
        const chainConfig = {
            chainNamespace: 'solana' as Web3AuthBase.ChainNamespaceType,
            chainId: "0x3",
            rpcTarget: "https://summer-frosty-friday.solana-devnet.quiknode.pro/5430f85cfb9a90ac2763131b24d8a746f2d18825",
            displayName: "Sapphire Devnet",
            blockExplorer: "https://explorer.solana.com",
            ticker: "SOL",
            tickerName: "Solana",
        };

        const clientId = "BAxMb2KhVmD4HMcZFa_lir3rFiMZlSuEVMZ0jeE0WYJIfNPGnxT0ZOxyo3ZhSc-JpEz5InPziaaJXgbIGU8EUz0";

        // Initialize Web3Auth
        const web3auth = new Web3Auth({
            clientId,
            web3AuthNetwork: "sapphire_devnet",
            chainConfig
        });

        const privateKeyProvider = new SolanaPrivateKeyProvider({
            config: { chainConfig }
        });

        const openloginAdapter = new OpenloginAdapter({
            adapterSettings: {
                uxMode: "popup",
                loginConfig: {
                    jwt: {
                        verifier: "svelte-solana",
                        typeOfLogin: "jwt",
                        clientId: "tAxzHQhxFyOMYHkoauwt0L9CfrY7okUe",
                    }
                }
            },
            privateKeyProvider
        });

        web3auth.configureAdapter(openloginAdapter);

        // console.log('Web3Auth and associated modules have been initialized.');

        // Return the initialized objects
        return { web3auth, privateKeyProvider, openloginAdapter, chainConfig, clientId };
    } catch (error) {
        // console.error("Error initializing Web3Auth:", error);
        return null;
    }
}
