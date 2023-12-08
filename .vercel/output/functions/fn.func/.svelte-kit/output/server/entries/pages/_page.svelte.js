import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import "../../chunks/auth.js";
import "@web3auth/solana-provider";
import "@solana/web3.js";
const Main = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="flex flex-col md:flex-row gap-10 py-10"> <div class="md:w-1/2 flex items-center justify-center bg-blue-500" data-svelte-h="svelte-17isevl"><img src="/web.png" alt="Decorative background" class="max-w-full h-auto p-10"></div>  <div class="md:w-1/2 flex items-center bg-white p-10"><div class="max-w-md mx-auto w-full"><div class="text-center p-6 bg-gray-100 rounded-lg shadow-md"><h1 class="text-4xl font-semibold mb-4 text-blue-600" data-svelte-h="svelte-1pzx9sp">Welcome Back!</h1> <button class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mt-6" data-svelte-h="svelte-yu0853">Login with Bitbucket</button></div></div></div></main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Main, "Main").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
