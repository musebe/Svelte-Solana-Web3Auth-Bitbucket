

# README_dashboardHandlers.md

## Overview

`dashboardHandlers.ts` is a TypeScript file in a web application integrating Solana blockchain and Web3Auth. It contains handler functions for the dashboard, managing wallet connections, user authentication states, and displaying relevant user information.

## Key Components

### Stores
- **`user`**: Svelte writable store containing user information.
- **`solanaWallet`**: Store holding the connected Solana wallet instance.
- **`isLoading`**: Boolean store indicating if an operation is in progress.
- **`isBalanceLoading`**: Store for tracking the balance loading state.
- **`errorMessage`**: String store for any error messages.
- **`balance`**: Store for the user's Solana wallet balance.

### Functions

#### `handleConnectWallet`
- **Purpose**: Connects to the user's wallet and retrieves user information.
- **Updates**: Sets user info and wallet instance in stores; handles errors.

#### `handleGetAccountBalance`
- **Purpose**: Fetches the balance of the connected wallet.
- **Behavior**: Subscribes to `solanaWallet` store; updates `balance` and `errorMessage`.

#### `handleLogout`
- **Purpose**: Handles the user logout process.
- **Behavior**: Logs out the user, resets the login state, and redirects to home.

## Installation & Usage

1. Ensure dependencies such as `@web3auth/base`, `@web3auth/solana-provider`, and Svelte's store and navigation modules are installed.
2. Import the required handlers from `dashboardHandlers.ts` into your Svelte components.

   ```javascript
   import { handleConnectWallet, handleLogout, handleGetAccountBalance } from './dashboardHandlers';
   ```

3. Use these functions to handle user interactions in the dashboard like wallet connection, balance retrieval, and logout.

## Dependencies

- `@web3auth/base`
- `@web3auth/solana-provider`
- `svelte/store`: For creating reactive stores.
- `$app/navigation`: For navigation in SvelteKit applications.

## Notes

- Proper error handling is implemented in these functions to manage exceptions and provide feedback to the user.
- These handlers are designed to work seamlessly with the Svelte reactive store system and the `$app/navigation` module for a smooth user experience.

---

This README provides an in-depth look at the `dashboardHandlers.ts` file, its functions, and stores, along with guidance on how to implement these handlers in a Solana and Web3Auth integrated Svelte application.