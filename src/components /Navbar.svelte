<script>
  import { onMount } from 'svelte';
  import { writable, derived } from 'svelte/store';
  import { goto } from '$app/navigation';
  import {
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

  async function handleLogin() {
    try {
      const wallet = await connectWallet();
      console.log('Connected wallet:', wallet);
      isLoggedIn.set(true); // Update login status
      // Handle the connected wallet

         // Fetch and display the account balance
      const balance = await getAccountBalance(wallet);
      console.log(`Account Balance: ${balance} SOL`);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error
    }
  }

  async function handleLogout() {
    try {
      await logout();
      console.log('Logged out successfully');
      isLoggedIn.set(false); // Update login status
      // Handle the post-logout logic here, like updating UI
    } catch (error) {
      console.error('Logout failed:', error);
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

<style>
  /* Custom styles can be added here */
</style>
