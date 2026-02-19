<script lang="ts">
  type Props = {
    onSearch: () => void
  }

  let { onSearch }: Props = $props()

  const buttonClasses =
    'w-full px-3 py-2 text-sm font-medium rounded bg-redis-hyper text-white hover:bg-redis-deep-hyper focus:outline-none focus:ring-2 focus:ring-redis-hyper focus:ring-offset-2 focus:ring-offset-redis-dusk'
</script>

<button type="button" onclick={onSearch} class={buttonClasses}>
  <i class="fa-solid fa-magnifying-glass mr-2"></i>
  Search
</button>

