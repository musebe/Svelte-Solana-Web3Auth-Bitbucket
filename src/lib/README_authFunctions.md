
---

# README_authFunctions.md

## Overview

`authFunctions.ts` is a TypeScript file in a Solana and Web3Auth integrated application. It contains essential functions for managing user authentication, wallet connections, and user data interactions within a Solana-based blockchain application.

## Key Functions

### `initWeb3Auth`
- **Description**: Initializes the Web3Auth modal for user interactions.
- **Usage**: Call at the start of an application to prepare the authentication process.

### `connectWallet`
- **Description**: Establishes a connection to the user's Solana wallet and fetches user information.
- **Returns**: An object with the Solana wallet instance and user info, or `null` on failure.

### `logout`
- **Description**: Logs out the current user from the Web3Auth session.
- **Usage**: Use to end the user's session and disconnect from Web3Auth.

### `getAccountBalance`
- **Description**: Retrieves the balance of the connected Solana wallet.
- **Parameters**: A `SolanaWallet` instance.
- **Returns**: Balance in SOL.

### `loginWithBitbucket`
- **Description**: Initiates login with Bitbucket as the authentication provider.
- **Usage**: Call to enable users to log in using their Bitbucket credentials.

### `getUserInfo`
- **Description**: Fetches the connected user's information.
- **Returns**: User info object on success; otherwise, an error is thrown.

## Installation & Usage

1. Ensure dependencies `@web3auth/modal`, `@web3auth/solana-provider`, and `@solana/web3.js` are installed.
2. Import the required functions from `authFunctions.ts` into your project.

## Dependencies

- `@web3auth/modal`
- `@web3auth/solana-provider`
- `@solana/web3.js`

## Important Notes

- Proper error handling is vital, especially for functions like `getAccountBalance` and `getUserInfo`.
- The environment should be correctly configured for Solana and Web3Auth before utilizing these functions.

---

This README provides detailed information on the `authFunctions.ts` file, outlining each function's purpose, usage instructions, and dependencies required for integration into a Solana-based blockchain application.