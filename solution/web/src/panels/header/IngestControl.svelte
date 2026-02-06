<script lang="ts">
  import PrimaryButton from '@components/buttons/PrimaryButton.svelte'
  import TextInput from '@components/TextInput.svelte'

  let ingestCount = $state('')

  function validateNumber(value: string): string {
    const filtered = value.replace(/[^0-9]/g, '')
    return filtered === '0' ? '' : filtered
  }

  function handleIngest() {
    const count = ingestCount ? Number(ingestCount) : undefined
    console.log('Ingest clicked', count)
    // TODO: Call ingest API
    ingestCount = ''
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
