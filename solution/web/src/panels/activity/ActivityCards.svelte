<script lang="ts">
  import ActivitiesState from '@states/activities-state.svelte'
  import IngestCard from './ingest-card/IngestCard.svelte'

  const activitiesState = ActivitiesState.instance
</script>

<div class="space-y-4">
  {#each activitiesState.activities as activity}
    {#if activity.type === 'ingest'}
      <IngestCard {activity} />
    {/if}
  {/each}
</div>
