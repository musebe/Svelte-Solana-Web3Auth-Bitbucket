// src/lib/auth.ts
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

export const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.SOLANA,
    chainId: "0x3", // Mainnet
    rpcTarget: "https://summer-frosty-friday.solana-devnet.quiknode.pro/5430f85cfb9a90ac2763131b24d8a746f2d18825",
    displayName: "Sapphire Devnet",
    blockExplorer: "https://explorer.solana.com",
    ticker: "SOL",
    tickerName: "Solana",
};

export const clientId = "BAxMb2KhVmD4HMcZFa_lir3rFiMZlSuEVMZ0jeE0WYJIfNPGnxT0ZOxyo3ZhSc-JpEz5InPziaaJXgbIGU8EUz0";

export const web3auth = new Web3Auth({
    clientId: clientId,
    web3AuthNetwork: "sapphire_devnet",
    chainConfig: chainConfig
});

export const privateKeyProvider = new SolanaPrivateKeyProvider({
    config: { chainConfig },
});

console.log('Private Key Provider set up');

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

console.log('Openlogin Adapter configured');

web3auth.configureAdapter(openloginAdapter);
