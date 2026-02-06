<script lang="ts">
  type Props = {
    topics: string[]
  }

  let { topics }: Props = $props()
</script>

{#if topics.length > 0}
  <div class="flex flex-wrap gap-1">
    {#each topics as topic}
      <span class="px-2 py-0.5 bg-redis-midnight rounded text-xs text-redis-yellow">{topic}</span>
    {/each}
  </div>
{/if}

