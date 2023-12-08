// // Imports necessary modules for Web3 authentication and Solana blockchain interaction.

// import {Web3Auth} from '@web3auth/modal';

// console.log(Web3Auth); 
// // import * as Web3AuthModule from '@web3auth/modal';
// // const Web3Auth = Web3AuthModule.Web3Auth;

// // import { CHAIN_NAMESPACES } from "@web3auth/base";
// import type * as Web3AuthBase from '@web3auth/base';
// // const { CHAIN_NAMESPACES } = Web3AuthBase;

// // import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
// import * as SolanaProvider from '@web3auth/solana-provider';
// const { SolanaPrivateKeyProvider } = SolanaProvider;

// // import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// import * as OpenloginAdapterModule from '@web3auth/openlogin-adapter';
// const { OpenloginAdapter } = OpenloginAdapterModule;

// // Configuration for the Solana blockchain, specifying chain details and connection information.
// // console.log('Checking CHAIN_NAMESPACES before using it:', CHAIN_NAMESPACES);
// // if (!CHAIN_NAMESPACES.SOLANA) {
// //     console.error('Error: CHAIN_NAMESPACES.SOLANA is undefined');
// // }

// // Configuration for the Solana blockchain, specifying chain details and connection information.

// export const chainConfig = {
//     // Use a hardcoded string 'solana' as a temporary workaround
//     chainNamespace: 'solana' as Web3AuthBase.ChainNamespaceType,
//     chainId: "0x3", // Mainnet
//     rpcTarget: "https://summer-frosty-friday.solana-devnet.quiknode.pro/5430f85cfb9a90ac2763131b24d8a746f2d18825",
//     displayName: "Sapphire Devnet",
//     blockExplorer: "https://explorer.solana.com",
//     ticker: "SOL",
//     tickerName: "Solana",
// };

// // Client ID for the application, used in authentication processes.
// export const clientId = "BAxMb2KhVmD4HMcZFa_lir3rFiMZlSuEVMZ0jeE0WYJIfNPGnxT0ZOxyo3ZhSc-JpEz5InPziaaJXgbIGU8EUz0";


// // Initializes Web3Auth with the specified client ID and blockchain configuration.
// export const web3auth = new Web3Auth({
//     clientId: clientId,
//     web3AuthNetwork: "sapphire_devnet",
//     chainConfig: chainConfig
// });


// // Sets up a private key provider for Solana, using the blockchain configuration.
// export const privateKeyProvider = new SolanaPrivateKeyProvider({
//     config: { chainConfig },
// });

// // Logs the setup completion of the private key provider.
// console.log('Private Key Provider set up');

// // Configures the OpenloginAdapter with specific settings for user authentication, including UX mode and login configurations.
// export const openloginAdapter = new OpenloginAdapter({
//     adapterSettings: {
//         uxMode: "popup",
//         loginConfig: {
//             jwt: {
//                 verifier: "svelte-solana",
//                 typeOfLogin: "jwt",
//                 clientId: "tAxzHQhxFyOMYHkoauwt0L9CfrY7okUe",
//             },
//         },
//     },
//     privateKeyProvider,
// });

// // Logs the configuration completion of the Openlogin Adapter.
// console.log('Openlogin Adapter configured');


// // Final step to link the Web3Auth instance with the configured Openlogin Adapter.
// web3auth.configureAdapter(openloginAdapter);



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

        console.log('Web3Auth and associated modules have been initialized.');

        // Return the initialized objects
        return { web3auth, privateKeyProvider, openloginAdapter, chainConfig, clientId };
    } catch (error) {
        console.error("Error initializing Web3Auth:", error);
        return null;
    }
}
