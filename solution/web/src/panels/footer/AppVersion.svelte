<script lang="ts">
  import { fetchVersion, type VersionInfo } from '@services/api-service'

  let versionInfo = $state<VersionInfo | null>(null)

  $effect(() => {
    fetchVersion().then((info) => {
      versionInfo = info
    })
  })
</script>

<div class="flex items-center gap-2 text-sm text-redis-dusk-30">
  {#if versionInfo}
    <span class="font-mono">news-agent</span>
    <span>v{versionInfo.version}</span>
  {:else}
    <span class="font-mono">loading...</span>
  {/if}
</div>

