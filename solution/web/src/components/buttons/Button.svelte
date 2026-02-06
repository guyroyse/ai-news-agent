<script lang="ts">
  import BaseButton from './BaseButton.svelte'

  interface Props {
    icon?: string
    label?: string
    title?: string
    onclick?: () => void
    clazz?: string
  }

  let { icon, label, title, onclick, clazz = '' }: Props = $props()

  const buttonClasses = 'bg-redis-dusk-90 hover:bg-redis-dusk-70'
</script>

<BaseButton {icon} {label} {title} {onclick} clazz="{buttonClasses} {clazz}" />
