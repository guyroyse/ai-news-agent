<script lang="ts">
  import AppStore from '@stores/app-store.svelte'

  const appStore = AppStore.instance

  function toggleSource(source: string) {
    if (appStore.search.sources.includes(source)) {
      appStore.search.sources = appStore.search.sources.filter((s: string) => s !== source)
    } else {
      appStore.search.sources = [...appStore.search.sources, source]
    }
  }
</script>

<fieldset>
  <legend class="text-sm text-redis-dusk-30 mb-2">Sources</legend>
  <div class="space-y-1">
    {#each appStore.sources.sources as source}
      <label class="flex items-center gap-2 cursor-pointer text-sm text-white hover:text-redis-sky-blue">
        <input
          type="checkbox"
          checked={appStore.search.sources.includes(source)}
          onchange={() => toggleSource(source)}
          class="accent-redis-violet"
        />
        {source}
      </label>
    {/each}
    {#if appStore.sources.sources.length === 0}
      <p class="text-sm text-redis-dusk-50 italic">No sources available</p>
    {/if}
  </div>
</fieldset>
