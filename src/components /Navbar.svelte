<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';

  import {
    // @ts-ignore
    initWeb3Auth,
    connectWallet,
    logout,
    getAccountBalance,
  } from '../lib/auth';

  let isMenuOpen = false;
  let isLoggedIn = writable(false); // Reactive variable to track login status

  onMount(async () => {
    await initWeb3Auth();
    console.log('Web3Auth initialized');

    // Client-side logic
    if (typeof window !== 'undefined') {
      // Check for sessionId in local storage
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        // Redirect to dashboard if sessionId exists
        goto('/dashboard');
      }
    }
  });

  // Function to create a delay
  /**
   * @param {number | undefined} ms
   */
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleLogin() {
    try {
      const wallet = await connectWallet();
      if (wallet) {
         console.log('Connected wallet:', wallet);
        await delay(4000);
        isLoggedIn.set(true);

        const balance = await getAccountBalance(wallet);
        console.log(`Account Balance: ${balance} SOL`);

        goto('/dashboard');
      } else {
        console.log('Wallet connection failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      console.log('Logged out successfully');
      isLoggedIn.set(false); // Update login status to reflect the user is logged out

      // Redirect to the homepage
      goto('/'); // Redirects to the homepage route
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle the error appropriately
    }
  }
</script>

<nav class="bg-white shadow-lg">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between items-center py-3">
      <!-- Website Logo -->
      <a href="/" class="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" class="h-8 w-8" />
        <span class="font-semibold text-gray-800 text-lg"
          >Bitbucket Solana Integration</span
        >
      </a>

      <!-- Conditional Button: Login or Logout -->
      {#if $isLoggedIn}
        <button
          on:click={handleLogout}
          class="py-2 px-3 text-white bg-red-500 rounded hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      {:else}
        <button
          on:click={handleLogin}
          class="py-2 px-3 text-white bg-green-500 rounded hover:bg-green-600 transition duration-300"
        >
          Login
        </button>
      {/if}
    </div>
  </div>
</nav>
