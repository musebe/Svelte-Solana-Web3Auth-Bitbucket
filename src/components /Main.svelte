<script lang="ts">
  import { onMount } from 'svelte';
  import { loginWithBitbucket, initWeb3Auth,  getAccountBalance, connectWallet,logout } from '../lib/auth';
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';


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
      console.log('Logging in with Bitbucket...');
      await loginWithBitbucket();
      console.log('Login successful.');

      // Delay for 3 seconds before redirecting
      setTimeout(() => {
        // Force redirect to the dashboard after 3 seconds
        goto('/dashboard');
      }, 3000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure
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

<main class="flex flex-col md:flex-row gap-10 py-10">
  <!-- Image Section -->
  <div class="md:w-1/2 flex items-center justify-center bg-blue-500">
    <img
      src="/web.png"
      alt="Decorative background"
      class="max-w-full h-auto p-10"
    />
  </div>

  <!-- Login/Text Section -->
  <div class="md:w-1/2 flex items-center bg-white p-10">
    <div class="max-w-md mx-auto w-full">
      <div class="text-center p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 class="text-4xl font-semibold mb-4 text-blue-600">Welcome Back!</h1>

        <button
          on:click={handleLogin}
          class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mt-6"
        >
          Login with Bitbucket
        </button>
      </div>

      <!-- Login Button -->
    </div>
  </div>
</main>
