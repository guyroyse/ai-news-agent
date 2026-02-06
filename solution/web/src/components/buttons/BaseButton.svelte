<script lang="ts">
  interface Props {
    icon?: string
    label?: string
    title?: string
    onclick?: () => void
    clazz?: string
  }

  let { icon, label, title, onclick, clazz = '' }: Props = $props()

  const baseClasses = 'flex items-center gap-2 px-3 py-1 text-sm rounded transition-colors cursor-pointer'
</script>

<button class="{baseClasses} {clazz}" {title} {onclick}>
  {#if icon}
    <i class={icon}></i>
  {/if}
  {#if label}
    <span>{label}</span>
  {/if}
</button>
