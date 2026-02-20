<script lang="ts">
  import AppStore from '@stores/app-store.svelte'

  const appStore = AppStore.instance

  let divElement: HTMLDivElement

  function handleInput(e: Event) {
    const target = e.target as HTMLDivElement
    appStore.search.semanticQuery = target.textContent ?? ''
  }

  // Sync DOM when state changes externally (e.g., clear)
  $effect(() => {
    if (divElement && divElement.textContent !== appStore.search.semanticQuery) {
      divElement.textContent = appStore.search.semanticQuery
    }
  })

  const editableClasses =
    'w-full px-2 py-2 text-sm rounded bg-redis-midnight text-redis-white border border-redis-dusk-90 focus:outline-none focus:ring-1 focus:ring-redis-hyper min-h-24 overflow-y-auto'
</script>

<fieldset>
  <legend class="text-sm text-redis-dusk-30 mb-2">Semantic Search</legend>
  <div
    bind:this={divElement}
    contenteditable="true"
    role="textbox"
    aria-multiline="true"
    aria-placeholder="Search by meaning..."
    class="{editableClasses} semantic-search-input"
    oninput={handleInput}
  ></div>
</fieldset>

<style>
  .semantic-search-input:empty::before {
    content: 'Search by meaning...';
    color: #808080;
  }
</style>
