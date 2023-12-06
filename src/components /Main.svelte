<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { initWeb3Auth } from '../lib/authFunctions';
  import { handleLogin } from '../lib/utils';

  onMount(async () => {
    await initWeb3Auth();
    console.log('Web3Auth initialized');

    // Client-side logic
    if (typeof window !== 'undefined') {
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        goto('/dashboard');
      }
    }
  });
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
    </div>
  </div>
</main>
