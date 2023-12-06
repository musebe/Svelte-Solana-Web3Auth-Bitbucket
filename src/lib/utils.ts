import { goto } from '$app/navigation';
import { logout, loginWithBitbucket } from '../lib/authFunctions';
import { isLoggedIn } from '../stores/authStore';

export async function handleLogin() {
    try {
        console.log('Logging in with Bitbucket...');
        await loginWithBitbucket();
        console.log('Login successful.');

        setTimeout(() => {
            goto('/dashboard');
        }, 3000);
    } catch (error) {
        console.error('Login failed:', error);
    }
}

export async function handleLogout() {
    try {
        await logout();
        console.log('Logged out successfully');
        isLoggedIn.set(false);
        goto('/');
    } catch (error) {
        console.error('Logout failed:', error);
    }
}
