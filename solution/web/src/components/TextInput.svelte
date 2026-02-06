<script lang="ts">
  type Align = 'left' | 'center' | 'right'

  interface Props {
    value: string
    validate?: (value: string) => string
    align?: Align
    placeholder?: string
    title?: string
    clazz?: string
  }

  let { value = $bindable(), validate, align = 'left', placeholder, title, clazz = '' }: Props = $props()

  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement
    let newValue = input.value
    if (validate) {
      newValue = validate(newValue)
      input.value = newValue
    }
    value = newValue
  }

  const alignClasses: Record<Align, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  const baseClasses =
    'px-2 py-1 text-sm rounded bg-redis-midnight text-redis-white placeholder-redis-black-50 border border-redis-dusk-90 focus:outline-none focus:ring-1 focus:ring-redis-hyper'
  const alignClass = $derived(alignClasses[align])
</script>

<input type="text" {value} oninput={handleInput} {placeholder} {title} class="{baseClasses} {alignClass} {clazz}" />
