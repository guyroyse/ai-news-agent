<script lang="ts">
  type Props = {
    tag: string
    onremove: () => void
  }

  let { tag, onremove }: Props = $props()
</script>

<span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-redis-hyper text-white">
  {tag}
  <button
    type="button"
    onclick={onremove}
    class="hover:text-redis-dusk-30 focus:outline-none cursor-pointer"
    title="Remove {tag}"
  >
    <i class="fa-solid fa-xmark text-[10px]"></i>
  </button>
</span>

