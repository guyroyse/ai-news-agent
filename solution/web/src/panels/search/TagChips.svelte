<script lang="ts">
  import TagChip from './TagChip.svelte'

  type Props = {
    tags: string[]
    onremove: (tag: string) => void
  }

  let { tags, onremove }: Props = $props()
</script>

{#if tags.length > 0}
  <div class="flex flex-wrap gap-1 mt-2">
    {#each tags as tag}
      <TagChip {tag} onremove={() => onremove(tag)} />
    {/each}
  </div>
{/if}

