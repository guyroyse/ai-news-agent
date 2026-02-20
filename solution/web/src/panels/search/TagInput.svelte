<script lang="ts">
  import AppStore from '@stores/app-store.svelte'
  import SuggestionList from './SuggestionList.svelte'
  import TagChips from './TagChips.svelte'

  type TagField = 'topics' | 'people' | 'organizations' | 'locations'

  type Props = {
    field: TagField
    label: string
    placeholder?: string
  }

  let { field, label, placeholder = '' }: Props = $props()

  const appStore = AppStore.instance

  // Input for typeahead filtering
  let inputValue = $state('')
  let showSuggestions = $state(false)

  // Get available tags for this field from the tags store
  const availableTags = $derived(appStore.tags[field])

  // Filter available tags based on input, excluding already selected
  const filteredTags = $derived(
    availableTags
      .filter(tag => !appStore.search[field].includes(tag))
      .filter(tag => tag.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 10) // Limit to 10 suggestions
  )

  // Get selected tags for this field
  const selectedTags = $derived(appStore.search[field])

  function addTag(tag: string) {
    if (!appStore.search[field].includes(tag)) {
      appStore.search[field] = [...appStore.search[field], tag]
    }
    inputValue = ''
    showSuggestions = false
  }

  function removeTag(tag: string) {
    appStore.search[field] = appStore.search[field].filter(t => t !== tag)
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && filteredTags.length > 0) {
      e.preventDefault()
      addTag(filteredTags[0])
    } else if (e.key === 'Escape') {
      showSuggestions = false
    }
  }

  function handleFocus() {
    showSuggestions = true
  }

  function handleBlur() {
    // Delay to allow click on suggestion
    setTimeout(() => {
      showSuggestions = false
    }, 150)
  }

  const inputClasses =
    'w-full px-2 py-1 text-sm rounded bg-redis-midnight text-redis-white border border-redis-dusk-90 focus:outline-none focus:ring-1 focus:ring-redis-hyper placeholder:text-gray-500'
</script>

<fieldset>
  <legend class="text-sm text-redis-dusk-30 mb-2">{label}</legend>

  <div class="relative">
    <input
      type="text"
      bind:value={inputValue}
      onkeydown={handleKeydown}
      onfocus={handleFocus}
      onblur={handleBlur}
      {placeholder}
      class={inputClasses}
    />
    <SuggestionList suggestions={filteredTags} visible={showSuggestions} onselect={addTag} />
  </div>

  <TagChips tags={selectedTags} onremove={removeTag} />
</fieldset>
