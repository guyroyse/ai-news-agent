<script lang="ts">
  import SemanticSearchInput from './SemanticSearchInput.svelte'
  import DateRangeFilter from './DateRangeFilter.svelte'
  import SourceFilter from './SourceFilter.svelte'
  import TextFilter from './TextFilter.svelte'
  import SearchButton from './SearchButton.svelte'

  let selectedSources = $state<string[]>([])
  let startDate = $state('')
  let endDate = $state('')
  let topics = $state('')
  let people = $state('')
  let organizations = $state('')
  let locations = $state('')
  let searchQuery = $state('')

  function handleSearch() {
    console.log('Search triggered', {
      searchQuery,
      startDate,
      endDate,
      selectedSources,
      topics,
      people,
      organizations,
      locations
    })
    // TODO: Call search API
  }
</script>

<aside class="w-72 bg-redis-dusk border-y-4 border-r-4 border-redis-midnight p-4 overflow-y-auto flex flex-col">
  <h2 class="text-lg font-semibold text-white mb-4">Search</h2>

  <div class="space-y-4 flex-1">
    <!-- Structured: From the feed itself -->
    <SourceFilter bind:selected={selectedSources} />
    <DateRangeFilter bind:startDate bind:endDate />

    <!-- Topics: Extracted by topic-classifier agent -->
    <TextFilter label="Topics" bind:value={topics} placeholder="e.g. climate, economy" />

    <!-- Named Entities: Extracted by entity-extractor agent -->
    <fieldset>
      <legend class="text-sm text-redis-dusk-30 mb-2">Named Entities</legend>
      <div class="space-y-2">
        <TextFilter bind:value={people} placeholder="People, e.g. Biden, Musk" />
        <TextFilter bind:value={organizations} placeholder="Organizations, e.g. NASA, Google" />
        <TextFilter bind:value={locations} placeholder="Locations, e.g. Ukraine, California" />
      </div>
    </fieldset>

    <!-- Vector: Semantic search using embeddings -->
    <SemanticSearchInput bind:query={searchQuery} />
  </div>

  <div class="mt-4">
    <SearchButton onSearch={handleSearch} />
  </div>
</aside>
