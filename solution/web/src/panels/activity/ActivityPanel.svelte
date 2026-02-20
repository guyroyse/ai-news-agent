<script lang="ts">
  import AppStore from '@stores/app-store.svelte'
  import ActivityCards from './ActivityCards.svelte'

  const appStore = AppStore.instance
</script>

<section class="flex-1 p-4 overflow-y-auto bg-redis-midnight">
  <header class="flex justify-between items-center mb-4">
    <h2 class="text-lg font-semibold text-white">Activity</h2>
    {#if appStore.activities.activities.length > 0}
      <button
        class="text-redis-dusk-30 hover:text-white cursor-pointer"
        title="Clear activity"
        onclick={() => appStore.activities.clear()}
      >
        <i class="fa-solid fa-trash-can"></i>
      </button>
    {/if}
  </header>
  {#if appStore.activities.activities.length === 0}
    <p class="text-sm text-redis-dusk-30">No activity yet. Try ingesting some articles!</p>
  {:else}
    <ActivityCards />
  {/if}
</section>
