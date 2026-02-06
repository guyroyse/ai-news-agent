<script lang="ts">
  import AppRouter, { Route } from '@src/app-router.svelte'
  import AppState from '@src/app-state.svelte'
  import BusyOverlay from '@components/BusyOverlay.svelte'

  const appRouter = AppRouter.instance
  const appState = AppState.instance
</script>

<main class="flex-1 flex min-h-0 relative">
  {#if appRouter.currentRoute === Route.Home}
    <h1>TODO: Create Home View</h1>
  {:else}
    <div class="flex-1 flex items-center justify-center">
      <p class="text-xl text-redis-hyper">Unknown route</p>
    </div>
  {/if}
</main>

{#if appState.displayOverlay}
  <BusyOverlay />
{/if}
