<script lang="ts">
  import AppStore from '@stores/app-store.svelte'
  import SemanticSearchInput from './SemanticSearchInput.svelte'
  import DateRangeFilter from './DateRangeFilter.svelte'
  import SourceFilter from './SourceFilter.svelte'
  import TagInput from './TagInput.svelte'

  const appStore = AppStore.instance

  function handleSearch() {
    appStore.search.search()
  }

  function handleClear() {
    appStore.search.clear()
  }

  const searchButtonClasses =
    'flex-1 px-3 py-2 text-sm font-medium rounded bg-redis-hyper text-white hover:bg-redis-deep-hyper focus:outline-none focus:ring-2 focus:ring-redis-hyper focus:ring-offset-2 focus:ring-offset-redis-dusk cursor-pointer'

  const clearButtonClasses =
    'px-3 py-2 text-sm font-medium rounded bg-redis-dusk-90 text-white hover:bg-redis-dusk-70 focus:outline-none focus:ring-2 focus:ring-redis-dusk-70 focus:ring-offset-2 focus:ring-offset-redis-dusk cursor-pointer'
</script>

<aside class="w-72 bg-redis-dusk border-y-4 border-r-4 border-redis-midnight p-4 overflow-y-auto flex flex-col">
  <h2 class="text-lg font-semibold text-white mb-4">Search</h2>

  <div class="space-y-4 flex-1">
    <!-- Structured: From the feed itself -->
    <SourceFilter />
    <DateRangeFilter />

    <!-- Topics: Extracted by topic-classifier agent -->
    <TagInput field="topics" label="Topics" placeholder="Type to search topics..." />

    <!-- Named Entities: Extracted by entity-extractor agent -->
    <TagInput field="people" label="People" placeholder="Type to search people..." />
    <TagInput field="organizations" label="Organizations" placeholder="Type to search organizations..." />
    <TagInput field="locations" label="Locations" placeholder="Type to search locations..." />

    <!-- Vector: Semantic search using embeddings -->
    <SemanticSearchInput />
  </div>

  <div class="flex gap-2 mt-8">
    <button type="button" onclick={handleSearch} class={searchButtonClasses}>
      <i class="fa-solid fa-magnifying-glass mr-2"></i>
      Search
    </button>
    <button type="button" onclick={handleClear} class={clearButtonClasses} title="Clear all filters">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</aside>
