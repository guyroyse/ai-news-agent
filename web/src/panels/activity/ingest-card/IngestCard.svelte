<script lang="ts">
  import type { IngestActivity } from '@stores/activities-store.svelte'
  import type { ArticleSummary } from '@services/api-service'
  import SourceGroup from './SourceGroup.svelte'

  type Props = {
    activity: IngestActivity
  }

  let { activity }: Props = $props()

  function formatDateTime(isoString: string): string {
    return new Date(isoString).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
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
      <i class="fa-solid fa-download text-redis-white"></i>
      <span class="font-medium text-redis-white">
        Ingested {activity.processed} of {activity.found} articles
      </span>
    </div>
    <time class="text-sm text-redis-dusk-30">{formatDateTime(activity.timestamp)}</time>
  </header>

  <div class="px-4 py-3">
    {#each [...groupedArticles.entries()] as [source, articles]}
      <SourceGroup {source} {articles} />
    {/each}
  </div>
</article>
