<script lang="ts">
  type TagType = 'topics' | 'people' | 'organizations' | 'locations'

  type Props = {
    tag: string
    type: TagType
    onremove?: () => void
  }

  let { tag, type, onremove }: Props = $props()

  const colorClasses: Record<TagType, string> = {
    topics: 'bg-redis-violet text-redis-midnight',
    people: 'bg-redis-sky-blue text-redis-midnight',
    organizations: 'bg-redis-hyper text-white',
    locations: 'bg-redis-yellow text-redis-midnight'
  }
</script>

<span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full {colorClasses[type]}">
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
