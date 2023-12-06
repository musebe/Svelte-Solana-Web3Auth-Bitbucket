import { logout } from './authFunctions';
import { goto } from '$app/navigation';
import { isLoggedIn } from '../stores/authStore';




/**
 * Connects to the user's wallet, retrieves user info, and sets up the private key provider.
 */







/**
 * Fetches the account balance of the connected wallet.
 */





/**
 * Handles user logout.
 */
export async function handleLogout(): Promise<void> {
    try {
        await logout();
        console.log('Logged out successfully');
        isLoggedIn.set(false);
        goto('/');
    } catch (error) {
        console.error('Logout failed:', error);
    }
}
