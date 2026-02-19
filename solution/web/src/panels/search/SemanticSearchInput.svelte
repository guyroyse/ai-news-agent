<script lang="ts">
  type Props = {
    query: string
  }

  let { query = $bindable() }: Props = $props()

  function handleInput(e: Event) {
    const target = e.target as HTMLDivElement
    query = target.textContent ?? ''
  }

  const editableClasses =
    'w-full px-2 py-2 text-sm rounded bg-redis-midnight text-redis-white border border-redis-dusk-90 focus:outline-none focus:ring-1 focus:ring-redis-hyper min-h-24 overflow-y-auto'
</script>

<fieldset>
  <legend class="text-sm text-redis-dusk-30 mb-2">Semantic Search</legend>
  <div
    contenteditable="true"
    role="textbox"
    aria-multiline="true"
    aria-placeholder="Search by meaning..."
    class="{editableClasses} semantic-search-input"
    oninput={handleInput}
  >{query}</div>
</fieldset>

<style>
  .semantic-search-input:empty::before {
    content: "Search by meaning...";
    color: #808080;
  }
</style>

