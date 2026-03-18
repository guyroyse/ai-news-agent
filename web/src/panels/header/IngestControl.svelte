<script lang="ts">
  import PrimaryButton from '@components/buttons/PrimaryButton.svelte'
  import TextInput from '@components/TextInput.svelte'
  import { ingestArticles } from '@services/api-service'
  import AppStore from '@stores/app-store.svelte'

  const appStore = AppStore.instance

  let ingestCount = $state('')

  function validateNumber(value: string): string {
    const filtered = value.replace(/[^0-9]/g, '')
    return filtered === '0' ? '' : filtered
  }

  async function handleIngest() {
    if (appStore.isIngesting) return
    const limit = ingestCount ? Number(ingestCount) : undefined
    ingestCount = ''

    appStore.isIngesting = true

    try {
      const result = await ingestArticles(limit)
      if (result.success) {
        await appStore.activities.addIngest(result.found, result.processed, result.articles)
        await Promise.all([appStore.sources.refresh(), appStore.tags.refresh()])
      } else {
        await appStore.activities.addError(result.error)
      }
    } catch (error) {
      await appStore.activities.addError(String(error))
    } finally {
      appStore.isIngesting = false
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
    disabled={appStore.isIngesting}
  />
  <PrimaryButton
    icon={appStore.isIngesting ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-download'}
    label="Ingest"
    title="Ingest articles"
    onclick={handleIngest}
    disabled={appStore.isIngesting}
  />
</div>
