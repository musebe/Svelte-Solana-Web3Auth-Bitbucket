

# README_authStore.md

## Overview

`authStore.ts` is a Svelte store module used in a web application for managing authentication states. This file leverages Svelte's reactive store system to track whether a user is logged in.

## Content

### `isLoggedIn`
- **Type**: Svelte Writable Store
- **Description**: A reactive store that holds the user's login state.
- **Default Value**: `false`
- **Usage**: This store can be imported and used in Svelte components to reactively display UI elements based on the user's authentication status.

## Installation & Usage

1. Ensure you have Svelte and `svelte/store` set up in your project.
2. Import `isLoggedIn` from `authStore.ts` into your Svelte components.

   ```javascript
   import { isLoggedIn } from './authStore';
   ```

3. Use the `isLoggedIn` store to conditionally render components or elements based on the user's login status.

   ```svelte
   {#if $isLoggedIn}
     <!-- Render user-specific content -->
   {:else}
     <!-- Render login or guest-related content -->
   {/if}
   ```

## Dependencies

- `svelte/store`: A module from Svelte for creating reactive stores.

## Notes

- The `isLoggedIn` store is a simple boolean store. For more complex authentication states, consider expanding this store or creating additional stores.
- Integrating this store with authentication logic (like login and logout functions) will require updates to the store's value using its `set` method.

---

This README provides essential information about the `authStore.ts` file, outlining its purpose, usage, and how to integrate it into a Svelte-based web application for handling authentication states.