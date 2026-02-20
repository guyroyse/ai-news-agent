<script lang="ts">
  import TagChip from './TagChip.svelte'

  type TagType = 'topics' | 'people' | 'organizations' | 'locations'

  type Props = {
    tags: string[]
    type: TagType
    onremove: (tag: string) => void
  }

  let { tags, type, onremove }: Props = $props()
</script>

{#if tags.length > 0}
  <div class="flex flex-wrap gap-1 mt-2">
    {#each tags as tag}
      <TagChip {tag} {type} onremove={() => onremove(tag)} />
    {/each}
  </div>
{/if}
