<script lang="ts">
  import type { IngestActivity } from '@states/activities-state.svelte'
  import type { ArticleSummary } from '@services/api-service'
  import SourceGroup from './SourceGroup.svelte'

  type Props = {
    activity: IngestActivity
  }

  let { activity }: Props = $props()

  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  }

  function groupBySource(articles: ArticleSummary[]): Map<string, ArticleSummary[]> {
    const groups = new Map<string, ArticleSummary[]>()
    for (const article of articles) {
      const existing = groups.get(article.source) ?? []
      groups.set(article.source, [...existing, article])
    }
    return groups
  }

  const groupedArticles = $derived(groupBySource(activity.articles))
</script>

<article class="bg-redis-dusk rounded-lg overflow-hidden">
  <header class="flex items-center justify-between px-4 py-3 bg-redis-dusk-90">
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-download text-redis-violet"></i>
      <span class="font-medium text-redis-white">
        Ingested {activity.processed} of {activity.found} articles
      </span>
    </div>
    <time class="text-sm text-redis-dusk-30">{formatTime(activity.timestamp)}</time>
  </header>

  <div class="px-4 py-3">
    {#each [...groupedArticles.entries()] as [source, articles]}
      <SourceGroup {source} {articles} />
    {/each}
  </div>
</article>
