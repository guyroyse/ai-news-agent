<script lang="ts">
  import ActivitiesState from '@states/activities-state.svelte'
  import ActivityCards from './ActivityCards.svelte'

  const activitiesState = ActivitiesState.instance
</script>

<section class="flex-1 p-4 overflow-y-auto bg-redis-midnight">
  <h2 class="text-lg font-semibold text-white mb-4">Activity</h2>
  {#if activitiesState.activities.length === 0}
    <p class="text-sm text-redis-dusk-30">No activity yet. Try ingesting some articles!</p>
  {:else}
    <ActivityCards />
  {/if}
</section>

