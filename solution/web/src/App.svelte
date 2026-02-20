<script lang="ts">
  import AppStore from '@stores/app-store.svelte'
  import BusyOverlay from '@components/BusyOverlay.svelte'
  import Header from '@panels/header/Header.svelte'
  import Footer from '@panels/footer/Footer.svelte'
  import SearchPanel from '@panels/search/SearchPanel.svelte'
  import ActivityPanel from '@panels/activity/ActivityPanel.svelte'
  import ChatPanel from '@panels/ChatPanel.svelte'

  const appStore = AppStore.instance
</script>

<Header />

<main class="flex-1 flex min-h-0">
  <SearchPanel />
  <ActivityPanel />
  <ChatPanel />
</main>

<Footer />

{#if appStore.displayOverlay}
  <BusyOverlay />
{/if}
