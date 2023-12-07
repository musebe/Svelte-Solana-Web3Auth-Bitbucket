<script lang="ts">
 

  import '../app.css';
  import Footer from '../components /Footer.svelte';
  import Navbar from '../components /Navbar.svelte';

  let scrollPositionY: number;
  let viewportWidth: number = 0;
  let viewportHeight: number = 0;

  function scrollToTop(): void {
    document.body.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<svelte:window
  bind:scrollY={scrollPositionY}
  bind:innerHeight={viewportHeight}
  bind:innerWidth={viewportWidth}
/>

<div class="flex flex-col h-screen">
  <!-- Navbar -->
  <Navbar />

  <!-- Main content -->
 <div class="flex-grow mx-4 md:mx-8 lg:mx-12 my-6 rounded-lg">
  <div class="bg-white p-6 md:p-8 lg:p-12 rounded-lg shadow-md">
    <slot />
    <!-- Your main content goes here -->
  </div>
</div>


  <!-- Scroll-to-Top Button -->
  <div
    class={`fixed bottom-0 w-full duration-200 flex p-10 z-[10] ${
      scrollPositionY > 0 ? 'opacity-full pointer-events-auto' : 'pointer-events-none opacity-0'
    }`}
  >
    <button
      on:click={scrollToTop}
      class="ml-auto rounded-full bg-slate-900 text-violet-400 px-3 sm:px-4 hover:bg-slate-800 cursor-pointer aspect-square grid place-items-center"
    >
      <i class="fa-solid fa-arrow-up"></i>
    </button>
  </div>

  <!-- Footer -->
  <Footer />
</div>
