<script lang="ts">
  import TagChip from './TagChip.svelte'
  import { TagType } from './chip-types'

  type Props = {
    topics: string[]
    people: string[]
    organizations: string[]
    locations: string[]
    class?: string
  }

  let { topics, people, organizations, locations, class: className = '' }: Props = $props()

  const sortedChips = $derived.by(() => {
    const topicChips = topics.map(name => ({ name, type: TagType.Topics }))
    const peopleChips = people.map(name => ({ name, type: TagType.People }))
    const organizationsChips = organizations.map(name => ({ name, type: TagType.Organizations }))
    const locationsChips = locations.map(name => ({ name, type: TagType.Locations }))

    const allChips = [...topicChips, ...peopleChips, ...organizationsChips, ...locationsChips]

    return allChips.sort((a, b) => a.name.localeCompare(b.name))
  })
</script>

<div class="flex flex-wrap gap-1 {className}">
  {#each sortedChips as chip}
    <TagChip tag={chip.name} type={chip.type} />
  {/each}
</div>
