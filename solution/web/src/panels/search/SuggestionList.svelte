<script lang="ts">
  type Props = {
    suggestions: string[]
    visible: boolean
    onselect: (suggestion: string) => void
  }

  let { suggestions, visible, onselect }: Props = $props()
</script>

{#if visible && suggestions.length > 0}
  <ul
    class="absolute z-10 w-full mt-1 bg-redis-midnight border border-redis-dusk-90 rounded shadow-lg max-h-48 overflow-y-auto"
  >
    {#each suggestions as suggestion}
      <li>
        <button
          type="button"
          onclick={() => onselect(suggestion)}
          class="w-full px-2 py-1 text-sm text-left text-redis-white hover:bg-redis-dusk cursor-pointer"
        >
          {suggestion}
        </button>
      </li>
    {/each}
  </ul>
{/if}

