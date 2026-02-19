<script lang="ts">
  type Props = {
    label?: string
    value: string
    placeholder?: string
  }

  let { label, value = $bindable(), placeholder = '' }: Props = $props()

  const inputClasses =
    'text-filter-input w-full px-2 py-1 text-sm rounded bg-redis-midnight text-redis-white border border-redis-dusk-90 focus:outline-none focus:ring-1 focus:ring-redis-hyper'
</script>

{#if label}
  <fieldset>
    <legend class="text-sm text-redis-dusk-30 mb-2">{label}</legend>
    <input
      type="text"
      bind:value={value}
      {placeholder}
      class={inputClasses}
    />
  </fieldset>
{:else}
  <input
    type="text"
    bind:value={value}
    {placeholder}
    class={inputClasses}
  />
{/if}

<style>
  .text-filter-input::placeholder {
    color: #808080;
  }
</style>

