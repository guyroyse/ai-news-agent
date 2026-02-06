<script lang="ts">
  import SourcesState from '@states/sources-state.svelte'

  type Props = {
    selected: string[]
  }

  let { selected = $bindable() }: Props = $props()

  const sourcesState = SourcesState.instance

  function toggleSource(source: string) {
    if (selected.includes(source)) {
      selected = selected.filter(s => s !== source)
    } else {
      selected = [...selected, source]
    }
  }
</script>

<fieldset>
  <legend class="text-sm text-redis-dusk-30 mb-2">Sources</legend>
  <div class="space-y-1">
    {#each sourcesState.sources as source}
      <label class="flex items-center gap-2 cursor-pointer text-sm text-white hover:text-redis-sky-blue">
        <input
          type="checkbox"
          checked={selected.includes(source)}
          onchange={() => toggleSource(source)}
          class="accent-redis-violet"
        />
        {source}
      </label>
    {/each}
    {#if sourcesState.sources.length === 0}
      <p class="text-sm text-redis-dusk-50 italic">No sources available</p>
    {/if}
  </div>
</fieldset>

