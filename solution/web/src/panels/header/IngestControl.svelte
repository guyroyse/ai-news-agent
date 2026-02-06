<script lang="ts">
  import PrimaryButton from '@components/buttons/PrimaryButton.svelte'
  import TextInput from '@components/TextInput.svelte'
  import { ingestArticles } from '@services/api-service'
  import AppState from '@src/app-state.svelte'

  const appState = AppState.instance

  let ingestCount = $state('')

  function validateNumber(value: string): string {
    const filtered = value.replace(/[^0-9]/g, '')
    return filtered === '0' ? '' : filtered
  }

  async function handleIngest() {
    const limit = ingestCount ? Number(ingestCount) : undefined
    ingestCount = ''

    appState.showOverlay()

    try {
      const result = await ingestArticles(limit)
      if (result.success) {
        console.log(`Ingested ${result.processed} of ${result.found} articles`)
        // TODO: Display results in activity stream
      } else {
        console.error('Ingest failed:', result.error)
        // TODO: Show error in UI
      }
    } catch (error) {
      console.error('Ingest error:', error)
      // TODO: Show error in UI
    } finally {
      appState.hideOverlay()
    }
  }
</script>

<div class="flex items-center gap-2">
  <span class="text-sm text-redis-dusk-30">Limit:</span>
  <TextInput
    bind:value={ingestCount}
    validate={validateNumber}
    align="center"
    title="Maximum number of articles to ingest"
    clazz="w-14"
  />
  <PrimaryButton icon="fa-solid fa-download" label="Ingest" title="Ingest articles" onclick={handleIngest} />
</div>
