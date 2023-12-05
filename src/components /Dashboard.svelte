<script lang="ts">
    // @ts-ignore
    import type { UserInfo } from '@web3auth/base/dist/types/adapter';
    import { connectWallet, getAccountBalance , logout} from '../lib/auth';
    // @ts-ignore
    import type { SolanaWallet } from '../lib/SolanaWallet'; // Adjust this import based on your actual file structure
     import { goto } from '$app/navigation';
       import { writable } from 'svelte/store';
     
    let user: Partial<UserInfo> | null = null;
    let solanaWallet: SolanaWallet | null = null;
    let isLoading: boolean = false;
    let isBalanceLoading: boolean = false;
    let errorMessage: string = '';
    let balance: number | null = null;

      let isLoggedIn = writable(false); 

    async function handleConnectWallet(): Promise<void> {
        isLoading = true;
        errorMessage = '';
        try {
            const walletConnection = await connectWallet();
            if (walletConnection && walletConnection.userInfo) {
                console.log('Wallet connected:', walletConnection.solanaWallet);
                user = walletConnection.userInfo;
                solanaWallet = walletConnection.solanaWallet; // Assuming solanaWallet is part of walletConnection
            } else {
                errorMessage = 'Wallet connection failed';
            }
        } catch (error: any) {
            console.error('Connection failed:', error);
            errorMessage = error.message || 'An error occurred during connection.';
        } finally {
            isLoading = false;
        }
    }

    async function handleGetAccountBalance(): Promise<void> {
        if (!solanaWallet) {
            errorMessage = 'No wallet connected';
            return;
        }

        isBalanceLoading = true;
        balance = null;
        try {
            // @ts-ignore
            balance = await getAccountBalance(solanaWallet);
        } catch (error: any) {
            console.error('Balance fetch failed:', error);
            errorMessage = error.message || 'An error occurred while fetching balance.';
        } finally {
            isBalanceLoading = false;
        }
    }

      // Logout function
    async function handleLogout() {
        try {
            await logout();
            console.log('Logged out successfully');
            isLoggedIn.set(false);
            goto('/');
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle the error appropriately
        }
    }
</script>

<div>
   <!-- Connect Wallet Button -->
    <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-auto w-full mb-2"
        on:click={handleConnectWallet}
        disabled={isLoading}
    >
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </button>

    <!-- Get Account Balance Button -->
    <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:ml-2 ml-0 md:w-auto w-full mb-2"
        on:click={handleGetAccountBalance}
        disabled={isBalanceLoading || !solanaWallet}
    >
        {isBalanceLoading ? 'Fetching Balance...' : 'Get Account Balance'}
    </button>

    <!-- Logout Button -->
    <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md:ml-2 ml-0 md:w-auto w-full"
        on:click={handleLogout}
    >
        Logout
    </button>
    <!-- Error Message Display -->
    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {/if}

    <!-- User Info Display -->
    {#if user}
        <div class="mt-4 p-4 border rounded shadow-lg">
            <img
                class="w-16 h-16 rounded-full mx-auto"
                src={user.profileImage}
                alt={user?.name ?? 'User'}
            />
            <p class="text-center text-lg font-semibold mt-2">{user?.name ?? 'Unknown User'}</p>
            <p class="text-center text-sm text-gray-600">{user?.email ?? 'No Email'}</p>
        </div>
    {:else}
        <p>No user data available</p>
    {/if}

    <!-- Account Balance Display -->
    {#if balance !== null}
        <div class="mt-4 p-4 border rounded shadow-lg">
            <p>Your account balance is: {balance} SOL</p>
        </div>
    {/if}
</div>
