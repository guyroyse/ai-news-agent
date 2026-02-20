<script lang="ts">
  import type { ArticleSummary as ArticleSummaryType } from '@services/api-service'
  import ArticleSummary from './ArticleSummary.svelte'

  type Props = {
    article: ArticleSummaryType
  }

  type TagType = 'topics' | 'people' | 'organizations' | 'locations'
  type TaggedChip = { name: string; type: TagType }

  let { article }: Props = $props()

  const colorClasses: Record<TagType, string> = {
    topics: 'bg-redis-violet text-redis-midnight',
    people: 'bg-redis-sky-blue text-redis-midnight',
    organizations: 'bg-redis-hyper text-white',
    locations: 'bg-redis-yellow text-redis-midnight'
  }

  // Combine all chips and sort alphabetically
  const sortedChips = $derived<TaggedChip[]>(
    [
      ...article.topics.map(name => ({ name, type: 'topics' as TagType })),
      ...article.namedEntities.people.map(name => ({ name, type: 'people' as TagType })),
      ...article.namedEntities.organizations.map(name => ({ name, type: 'organizations' as TagType })),
      ...article.namedEntities.locations.map(name => ({ name, type: 'locations' as TagType }))
    ].sort((a, b) => a.name.localeCompare(b.name))
  )
</script>

<details class="group/article">
  <summary class="flex items-center gap-2 cursor-pointer py-1 text-redis-dusk-30 hover:text-white list-none">
    <i class="fa-solid fa-chevron-right text-xs transition-transform group-open/article:rotate-90"></i>
    <span class="truncate">{article.title}</span>
  </summary>
  <div class="ml-4 py-2 text-sm space-y-2">
    <ArticleSummary summary={article.summary} />
    <div class="flex flex-wrap gap-1">
      {#each sortedChips as chip}
        <span class="px-2 py-0.5 text-xs rounded-full {colorClasses[chip.type]}">{chip.name}</span>
      {/each}
    </div>
  </div>
</details>
