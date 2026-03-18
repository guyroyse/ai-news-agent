<script lang="ts">
  import AppStore from '@stores/app-store.svelte'

  const appStore = AppStore.instance

  let startInput: HTMLInputElement
  let endInput: HTMLInputElement

  const wrapperClasses =
    'date-wrapper flex rounded border border-redis-dusk-90 focus-within:ring-1 focus-within:ring-redis-hyper'

  const inputClasses = 'date-input flex-1 px-2 py-1 text-sm bg-redis-midnight text-redis-white focus:outline-none'

  const buttonClasses =
    'px-2 py-1 text-sm bg-redis-dusk-90 text-redis-white hover:bg-redis-dusk-70 focus:outline-none cursor-pointer'
</script>

<fieldset>
  <legend class="text-sm text-redis-dusk-30 mb-2">Date Range</legend>
  <div class="space-y-2">
    <div>
      <label class="block text-xs text-redis-dusk-50 mb-1" for="start-date">From</label>
      <div class={wrapperClasses}>
        <input
          type="date"
          id="start-date"
          value={appStore.search.startDateString}
          oninput={e => (appStore.search.startDateString = e.currentTarget.value)}
          bind:this={startInput}
          class="{inputClasses} rounded-l"
        />
        <button type="button" onclick={() => startInput.showPicker()} class={buttonClasses} title="Open calendar">
          <i class="fa-solid fa-calendar"></i>
        </button>
        <button
          type="button"
          onclick={() => (appStore.search.startDateString = '')}
          class="{buttonClasses} rounded-r"
          title="Clear date"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
    <div>
      <label class="block text-xs text-redis-dusk-50 mb-1" for="end-date">To</label>
      <div class={wrapperClasses}>
        <input
          type="date"
          id="end-date"
          value={appStore.search.endDateString}
          oninput={e => (appStore.search.endDateString = e.currentTarget.value)}
          bind:this={endInput}
          class="{inputClasses} rounded-l"
        />
        <button type="button" onclick={() => endInput.showPicker()} class={buttonClasses} title="Open calendar">
          <i class="fa-solid fa-calendar"></i>
        </button>
        <button
          type="button"
          onclick={() => (appStore.search.endDateString = '')}
          class="{buttonClasses} rounded-r"
          title="Clear date"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  </div>
</fieldset>

<style>
  .date-input::-webkit-calendar-picker-indicator {
    display: none;
  }
</style>
