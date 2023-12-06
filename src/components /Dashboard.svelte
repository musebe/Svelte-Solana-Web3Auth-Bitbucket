<script lang="ts">
  import { handleConnectWallet, handleGetAccountBalance, handleLogout, user, solanaWallet, isLoading, isBalanceLoading, errorMessage, balance } from '../lib/dashboardHandlers';
  import { writable } from 'svelte/store';
  import type { UserInfo } from '@web3auth/base/dist/types/adapter';
  import type { SolanaWallet } from '@web3auth/solana-provider';

  let localUser: Partial<UserInfo> | null = null;
  user.subscribe(value => localUser = value);

  let localSolanaWallet: SolanaWallet | null = null;
  solanaWallet.subscribe(value => localSolanaWallet = value);

  let localIsLoading: boolean = false;
  isLoading.subscribe(value => localIsLoading = value);

  let localIsBalanceLoading: boolean = false;
  isBalanceLoading.subscribe(value => localIsBalanceLoading = value);

  let localErrorMessage: string = '';
  errorMessage.subscribe(value => localErrorMessage = value);

  let localBalance: number | null = null;
  balance.subscribe(value => localBalance = value);
</script>

<div>
  <!-- Connect Wallet Button -->
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-auto w-full mb-2"
    on:click={handleConnectWallet}
    disabled={localIsLoading}
  >
    {localIsLoading ? 'Connecting...' : 'Connect Wallet'}
  </button>

  <!-- Get Account Balance Button -->
  <button
    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:ml-2 ml-0 md:w-auto w-full mb-2"
    on:click={handleGetAccountBalance}
    disabled={localIsBalanceLoading || !localSolanaWallet}
  >
    {localIsBalanceLoading ? 'Fetching Balance...' : 'Get Account Balance'}
  </button>

  <!-- Logout Button -->
  <button
    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md:ml-2 ml-0 md:w-auto w-full"
    on:click={handleLogout}
  >
    Logout
  </button>
  
  <!-- Error Message Display -->
  {#if localErrorMessage}
    <p class="text-red-500">{localErrorMessage}</p>
  {/if}

  <!-- User Info Display -->
  {#if localUser}
    <div class="mt-4 p-4 border rounded shadow-lg">
      <img
        class="w-16 h-16 rounded-full mx-auto"
        src={localUser.profileImage}
        alt={localUser?.name ?? 'User'}
      />
      <p class="text-center text-lg font-semibold mt-2">
        {localUser?.name ?? 'Unknown User'}
      </p>
      <p class="text-center text-sm text-gray-600">
        {localUser?.email ?? 'No Email'}
      </p>
    </div>
  {:else}
    <p>No user data available</p>
  {/if}

  <!-- Account Balance Display -->
  {#if localBalance !== null}
    <div class="mt-4 p-4 border rounded shadow-lg">
      <p>Your account balance is: {localBalance} SOL</p>
    </div>
  {/if}
</div>
