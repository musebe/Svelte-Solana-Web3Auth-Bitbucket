import * as Web3AuthModule from "@web3auth/modal";
import * as SolanaProvider from "@web3auth/solana-provider";
import * as OpenloginAdapterModule from "@web3auth/openlogin-adapter";
const Web3Auth = Web3AuthModule.Web3Auth;
const { SolanaPrivateKeyProvider } = SolanaProvider;
const { OpenloginAdapter } = OpenloginAdapterModule;
const chainConfig = {
  // Use a hardcoded string 'solana' as a temporary workaround
  chainNamespace: "solana",
  chainId: "0x3",
  // Mainnet
  rpcTarget: "https://summer-frosty-friday.solana-devnet.quiknode.pro/5430f85cfb9a90ac2763131b24d8a746f2d18825",
  displayName: "Sapphire Devnet",
  blockExplorer: "https://explorer.solana.com",
  ticker: "SOL",
  tickerName: "Solana"
};
const clientId = "BAxMb2KhVmD4HMcZFa_lir3rFiMZlSuEVMZ0jeE0WYJIfNPGnxT0ZOxyo3ZhSc-JpEz5InPziaaJXgbIGU8EUz0";
const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: "sapphire_devnet",
  chainConfig
});
const privateKeyProvider = new SolanaPrivateKeyProvider({
  config: { chainConfig }
});
console.log("Private Key Provider set up");
const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    uxMode: "popup",
    loginConfig: {
      jwt: {
        verifier: "svelte-solana",
        typeOfLogin: "jwt",
        clientId: "tAxzHQhxFyOMYHkoauwt0L9CfrY7okUe"
      }
    }
  },
  privateKeyProvider
});
console.log("Openlogin Adapter configured");
web3auth.configureAdapter(openloginAdapter);
