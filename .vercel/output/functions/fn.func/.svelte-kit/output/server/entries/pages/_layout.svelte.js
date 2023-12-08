import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import "../../chunks/auth.js";
import "@web3auth/solana-provider";
import "@solana/web3.js";
const app = "";
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="bg-white shadow-lg text-black text-center p-2" data-svelte-h="svelte-hstevo"><p>© 2023 Web3auth</p> <p><a href="https://github.com/musebe/Svelte-Solana-Web3Auth-Bitbucket.git" class="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">View on GitHub</a></p> <p><a href="https://publishedmediajams.notion.site/Integrating-Web3Auth-and-BitBucket-in-Svelte-for-Solana-A-Step-by-Step-Guide-965ac6bea90c413bb4c7031ca9de16f5" class="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Read the documentation</a></p></footer>`;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isDashboard;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  isDashboard = $page.url.pathname === "/dashboard";
  $$unsubscribe_page();
  return ` <nav class="bg-white shadow-lg"><div class="max-w-6xl mx-auto px-4"><div class="flex justify-between items-center py-3"> <a href="/" class="flex items-center space-x-2" data-svelte-h="svelte-juwsf1"><img src="/logo.png" alt="Logo" class="h-8 w-8"> <span class="font-semibold text-gray-800 text-lg">Bitbucket Solana Integration</span></a>  ${!isDashboard ? `<button class="py-2 px-3 text-white bg-green-500 rounded hover:bg-green-600 transition duration-300" data-svelte-h="svelte-vl8fqh">Login</button>` : ``}</div></div></nav>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` <div class="flex flex-col h-screen"> ${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}  <div class="flex-grow mx-4 md:mx-8 lg:mx-12 my-6 rounded-lg"><div class="bg-white p-6 md:p-8 lg:p-12 rounded-lg shadow-md">${slots.default ? slots.default({}) : ``} </div></div>  <div${add_attribute(
    "class",
    `fixed bottom-0 w-full duration-200 flex p-10 z-[10] ${"pointer-events-none opacity-0"}`,
    0
  )}><button class="ml-auto rounded-full bg-slate-900 text-violet-400 px-3 sm:px-4 hover:bg-slate-800 cursor-pointer aspect-square grid place-items-center" data-svelte-h="svelte-isiheo"><i class="fa-solid fa-arrow-up"></i></button></div>  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
