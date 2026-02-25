<script lang="ts">
  interface Props {
    icon?: string
    label?: string
    title?: string
    onclick?: () => void
    clazz?: string
    disabled?: boolean
  }

  let { icon, label, title, onclick, clazz = '', disabled = false }: Props = $props()

  const baseClasses =
    'flex items-center gap-2 px-3 py-1 text-sm rounded transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
</script>

<button class="{baseClasses} {clazz}" {title} {onclick} {disabled}>
  {#if icon}
    <i class={icon}></i>
  {/if}
  {#if label}
    <span>{label}</span>
  {/if}
</button>
