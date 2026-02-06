<script lang="ts">
  type Props = {
    label: string
    entities: string[]
  }

  let { label, entities }: Props = $props()
</script>

{#if entities.length > 0}
  <p class="text-redis-dusk-30">
    <span class="text-redis-violet font-bold">{label}:</span>
    {entities.join(', ')}
  </p>
{/if}

