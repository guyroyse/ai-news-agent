<script lang="ts">
  import { TagType } from './chip-types'

  type Props = {
    tag: string
    type: TagType
    onremove?: () => void
  }

  let { tag, type, onremove }: Props = $props()

  const colorClass = $derived.by(() => {
    switch (type) {
      case TagType.Topics:
        return 'bg-redis-violet text-redis-midnight'
      case TagType.People:
        return 'bg-redis-sky-blue text-redis-midnight'
      case TagType.Organizations:
        return 'bg-redis-hyper text-white'
      case TagType.Locations:
        return 'bg-redis-yellow text-redis-midnight'
    }
  })
</script>

<span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full {colorClass}">
  {tag}
  {#if onremove}
    <button
      type="button"
      onclick={onremove}
      class="hover:opacity-70 focus:outline-none cursor-pointer"
      title="Remove {tag}"
    >
      <i class="fa-solid fa-xmark text-[10px]"></i>
    </button>
  {/if}
</span>
