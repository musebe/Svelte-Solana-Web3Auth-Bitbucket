<script>
  // @ts-nocheck

  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { handleLogin } from '../lib/utils';
  import { initWeb3Auth } from '../lib/authFunctions';
  import { isLoggedIn } from '../stores/authStore';

  $: isDashboard = $page.url.pathname === '/dashboard';

  onMount(async () => {
    await initWeb3Auth();
    // console.log('Web3Auth initialized');

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
</script>

<!-- HTML code remains the same -->

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
      {#if !isDashboard}
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
