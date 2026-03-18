<script lang="ts">
  import AppStore from '@stores/app-store.svelte'
  import ActivityCards from './ActivityCards.svelte'

  const appStore = AppStore.instance

  let activityContainer!: HTMLElement

  $effect(() => {
    // Track activities to trigger scroll
    appStore.activities.activities
    // Scroll to bottom when activities change
    if (activityContainer) {
      activityContainer.scrollTop = activityContainer.scrollHeight
    }
  })
</script>

<section class="flex-1 flex flex-col bg-redis-midnight border-y-4 border-redis-midnight">
  <!-- Header (fixed) -->
  <header class="flex justify-between items-center p-4">
    <h2 class="text-lg font-semibold text-white">Activity</h2>
    {#if appStore.activities.activities.length > 0}
      <button
        class="text-redis-dusk-30 hover:text-white cursor-pointer"
        title="Clear activity"
        onclick={async () => await appStore.activities.clear()}
      >
        <i class="fa-solid fa-trash-can"></i>
      </button>
    {/if}
  </header>

  <!-- Content (scrollable) -->
  <div bind:this={activityContainer} class="flex-1 overflow-y-auto p-4">
    {#if appStore.activities.activities.length === 0}
      <p class="text-sm text-redis-dusk-30">No activity yet. Try ingesting some articles!</p>
    {:else}
      <ActivityCards />
    {/if}
  </div>
</section>
