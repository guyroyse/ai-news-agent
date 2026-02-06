<script lang="ts">
  import AppState from '@states/app-state.svelte'
  import BusyOverlay from '@components/BusyOverlay.svelte'
  import Header from '@panels/header/Header.svelte'
  import Footer from '@panels/footer/Footer.svelte'
  import SearchPanel from '@panels/search/SearchPanel.svelte'
  import ActivityPanel from '@panels/activity/ActivityPanel.svelte'
  import ChatPanel from '@panels/ChatPanel.svelte'

  const appState = AppState.instance
</script>

<Header />

<main class="flex-1 flex min-h-0">
  <SearchPanel />
  <ActivityPanel />
  <ChatPanel />
</main>

<Footer />

{#if appState.displayOverlay}
  <BusyOverlay />
{/if}
