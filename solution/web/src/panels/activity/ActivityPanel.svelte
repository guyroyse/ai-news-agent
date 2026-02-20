<script lang="ts">
  import AppStore from '@stores/app-store.svelte'
  import ActivityCards from './ActivityCards.svelte'

  const appStore = AppStore.instance
</script>

<section class="flex-1 p-4 overflow-y-auto bg-redis-midnight">
  <h2 class="text-lg font-semibold text-white mb-4">Activity</h2>
  {#if appStore.activities.activities.length === 0}
    <p class="text-sm text-redis-dusk-30">No activity yet. Try ingesting some articles!</p>
  {:else}
    <ActivityCards />
  {/if}
</section>
