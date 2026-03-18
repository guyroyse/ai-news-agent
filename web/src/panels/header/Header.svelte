<script lang="ts">
  import AppTitle from './AppTitle.svelte'
  import IngestControl from './IngestControl.svelte'
  import BriefButtons from './BriefButtons.svelte'
</script>

<header class="bg-redis-dusk text-white px-6 py-5 flex items-center justify-between">
  <AppTitle />

  <div class="flex items-center gap-6">
    <IngestControl />
    <BriefButtons />
  </div>
</header>
