<script lang="ts">
  import { marked, Renderer } from 'marked'
  import type { ArticleActivity } from '@stores/activities-store.svelte'

  type Props = {
    activity: ArticleActivity
  }

  type TagType = 'topics' | 'people' | 'organizations' | 'locations'
  type TaggedChip = { name: string; type: TagType }

  let { activity }: Props = $props()

  function formatActivityTime(date: Date): string {
    return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  }

  function formatPublicationDate(timestamp: number): string {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const colorClasses: Record<TagType, string> = {
    topics: 'bg-redis-violet text-redis-midnight',
    people: 'bg-redis-sky-blue text-redis-midnight',
    organizations: 'bg-redis-hyper text-white',
    locations: 'bg-redis-yellow text-redis-midnight'
  }

  // Combine all chips and sort alphabetically
  const sortedChips = $derived<TaggedChip[]>(
    [
      ...activity.article.topics.map(name => ({ name, type: 'topics' as TagType })),
      ...activity.article.namedEntities.people.map(name => ({ name, type: 'people' as TagType })),
      ...activity.article.namedEntities.organizations.map(name => ({ name, type: 'organizations' as TagType })),
      ...activity.article.namedEntities.locations.map(name => ({ name, type: 'locations' as TagType }))
    ].sort((a, b) => a.name.localeCompare(b.name))
  )

  // Custom renderer to open links in new window
  const renderer = new Renderer()
  renderer.link = ({ href, text }) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
  }

  const renderedContent = $derived(marked.parse(activity.article.content, { renderer }) as string)
</script>

<article class="bg-redis-dusk rounded-lg overflow-hidden">
  <header class="flex items-center justify-between px-4 py-3 bg-redis-dusk-90">
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-newspaper text-redis-sky-blue"></i>
      <span class="font-medium text-redis-white">{activity.article.source}</span>
    </div>
    <time class="text-sm text-redis-dusk-30">{formatActivityTime(activity.timestamp)}</time>
  </header>
  <details class="px-4 py-3 group">
    <summary class="cursor-pointer list-none space-y-1">
      <h3 class="font-medium text-redis-white">
        <a href={activity.article.link} target="_blank" rel="noopener noreferrer" class="hover:text-redis-hyper">
          {activity.article.title}
        </a>
      </h3>
      <time class="text-xs text-redis-dusk-30">
        <i class="fa-solid fa-calendar-day mr-1"></i>
        {formatPublicationDate(activity.article.publicationDate)}
      </time>

      <!-- Structured Data (sorted alphabetically) -->
      <div class="flex flex-wrap gap-1 mt-2 mb-2">
        {#each sortedChips as chip}
          <span class="px-2 py-0.5 text-xs rounded-full {colorClasses[chip.type]}">{chip.name}</span>
        {/each}
      </div>

      <p class="text-sm text-redis-dusk-30 line-clamp-3 group-open:hidden">
        {activity.article.content}
      </p>
    </summary>
    <div class="prose prose-sm prose-invert mt-2">
      {@html renderedContent}
    </div>
  </details>
</article>
