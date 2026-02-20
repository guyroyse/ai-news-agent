<script lang="ts">
  import AppStore from '@stores/app-store.svelte'

  type SearchTextField = 'topics' | 'people' | 'organizations' | 'locations'

  type Props = {
    field: SearchTextField
    label?: string
    placeholder?: string
  }

  let { field, label, placeholder = '' }: Props = $props()

  const appStore = AppStore.instance

  const inputClasses =
    'text-filter-input w-full px-2 py-1 text-sm rounded bg-redis-midnight text-redis-white border border-redis-dusk-90 focus:outline-none focus:ring-1 focus:ring-redis-hyper'
</script>

{#if label}
  <fieldset>
    <legend class="text-sm text-redis-dusk-30 mb-2">{label}</legend>
    <input
      type="text"
      value={appStore.search[field]}
      oninput={e => (appStore.search[field] = e.currentTarget.value)}
      {placeholder}
      class={inputClasses}
    />
  </fieldset>
{:else}
  <input
    type="text"
    value={appStore.search[field]}
    oninput={e => (appStore.search[field] = e.currentTarget.value)}
    {placeholder}
    class={inputClasses}
  />
{/if}

<style>
  .text-filter-input::placeholder {
    color: #808080;
  }
</style>
