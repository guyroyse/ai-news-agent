<script lang="ts">
  import SourceFilter from './SourceFilter.svelte'

  let selectedSources = $state<string[]>([])
</script>

<aside class="w-72 bg-redis-dusk border-y-4 border-r-4 border-redis-midnight p-4">
  <h2 class="text-lg font-semibold text-white mb-4">Search</h2>

  <div class="space-y-4">
    <SourceFilter bind:selected={selectedSources} />
  </div>
</aside>
