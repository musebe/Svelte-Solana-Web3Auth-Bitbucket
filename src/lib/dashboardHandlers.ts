import { connectWallet, getAccountBalance, logout } from './authFunctions';
import type { UserInfo } from '@web3auth/base/dist/types/adapter';
import type { SolanaWallet } from '@web3auth/solana-provider'
import { isLoggedIn } from '../stores/authStore';
import { goto } from '$app/navigation';
import { writable } from 'svelte/store';

export const user = writable<Partial<UserInfo> | null>(null);
export let solanaWallet = writable<SolanaWallet | null>(null);
export const isLoading = writable<boolean>(false);
export const isBalanceLoading = writable<boolean>(false);
export const errorMessage = writable<string>('');
export const balance = writable<number | null>(null);


/**
 * Connects to the user's wallet, retrieves user info, and sets up the private key provider.
 */

export async function handleConnectWallet(): Promise<void> {
    isLoading.set(true);
    errorMessage.set('');
    try {
        const walletConnection = await connectWallet();
        if (walletConnection && walletConnection.userInfo) {
            // console.log('Wallet connected:', walletConnection.solanaWallet);
            user.set(walletConnection.userInfo);
            solanaWallet.set(walletConnection.solanaWallet);
        } else {
            errorMessage.set('Wallet connection failed');
        }
    } catch (error: unknown) { // Change from any to unknown
        if (error instanceof Error) {
            // console.error('Connection failed:', error);
            errorMessage.set(error.message || 'An error occurred during connection.');
        } else {
            // Handle the case where error is not an instance of Error
            // console.error('Unknown error during connection');
            errorMessage.set('An unknown error occurred during connection.');
        }
    } finally {
        isLoading.set(false);
    }
}




/**
 * Fetches the account balance of the connected wallet.
 */

export async function handleGetAccountBalance(): Promise<void> {
    let currentSolanaWallet;
    solanaWallet.subscribe(value => currentSolanaWallet = value);
    if (!currentSolanaWallet) {
        errorMessage.set('No wallet connected');
        return;
    }

    isBalanceLoading.set(true);
    balance.set(null);
    try {
        balance.set(await getAccountBalance(currentSolanaWallet));
    } catch (error: any) {
        // console.error('Balance fetch failed:', error);
        errorMessage.set(error.message || 'An error occurred while fetching balance.');
    } finally {
        isBalanceLoading.set(false);
    }
}
/**
 * Handles user logout
 */

export async function handleLogout(): Promise<void> {
    try {
        await logout();
        // console.log('Logged out successfully');
        isLoggedIn.set(false);
        goto('/');
    } catch (error) {
        // console.error('Logout failed:', error);
    }
}
