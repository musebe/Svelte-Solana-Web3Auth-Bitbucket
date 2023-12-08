import { c as create_ssr_component, e as escape, b as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import "@web3auth/solana-provider";
import "@solana/web3.js";
import { w as writable } from "../../../chunks/index.js";
const user = writable(null);
let solanaWallet = writable(null);
const isLoading = writable(false);
const isBalanceLoading = writable(false);
const errorMessage = writable("");
const balance = writable(null);
const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let localUser = null;
  user.subscribe((value) => localUser = value);
  let localSolanaWallet = null;
  solanaWallet.subscribe((value) => localSolanaWallet = value);
  let localIsLoading = false;
  isLoading.subscribe((value) => localIsLoading = value);
  let localIsBalanceLoading = false;
  isBalanceLoading.subscribe((value) => localIsBalanceLoading = value);
  let localErrorMessage = "";
  errorMessage.subscribe((value) => localErrorMessage = value);
  let localBalance = null;
  balance.subscribe((value) => localBalance = value);
  return `<div> <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-auto w-full mb-2" ${localIsLoading ? "disabled" : ""}>${escape(localIsLoading ? "Connecting..." : "Connect Wallet")}</button>  <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:ml-2 ml-0 md:w-auto w-full mb-2" ${localIsBalanceLoading || !localSolanaWallet ? "disabled" : ""}>${escape(localIsBalanceLoading ? "Fetching Balance..." : "Get Account Balance")}</button>  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md:ml-2 ml-0 md:w-auto w-full" data-svelte-h="svelte-jmsqlr">Logout</button>  ${localErrorMessage ? `<p class="text-red-500">${escape(localErrorMessage)}</p>` : ``}  ${localUser ? `<div class="mt-4 p-4 border rounded shadow-lg"><img class="w-16 h-16 rounded-full mx-auto"${add_attribute("src", localUser.profileImage, 0)}${add_attribute("alt", localUser?.name ?? "User", 0)}> <p class="text-center text-lg font-semibold mt-2">${escape(localUser?.name ?? "Unknown User")}</p> <p class="text-center text-sm text-gray-600">${escape(localUser?.email ?? "No Email")}</p></div>` : `<p data-svelte-h="svelte-4dxqnb">No user data available</p>`}  ${localBalance !== null ? `<div class="mt-4 p-4 border rounded shadow-lg"><p>Your account balance is: ${escape(localBalance)} SOL</p></div>` : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Dashboard, "Dashboard").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
