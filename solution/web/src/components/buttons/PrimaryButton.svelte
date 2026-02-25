<script lang="ts">
  import BaseButton from './BaseButton.svelte'

  interface Props {
    icon?: string
    label?: string
    title?: string
    onclick?: () => void
    clazz?: string
    disabled?: boolean
  }

  let { icon, label, title, onclick, clazz = '', disabled = false }: Props = $props()

  const buttonClasses = 'bg-redis-deep-hyper hover:bg-redis-hyper'
</script>

<BaseButton {icon} {label} {title} {onclick} {disabled} clazz="{buttonClasses} {clazz}" />
