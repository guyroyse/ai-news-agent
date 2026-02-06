<script lang="ts">
  import type { IngestActivity } from '@states/activities-state.svelte'
  import type { ArticleSummary } from '@services/api-service'

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
      <i class="fa-solid fa-download text-redis-yellow"></i>
      <span class="font-medium text-white">
        Ingested {activity.processed} of {activity.found} articles
      </span>
    </div>
    <time class="text-sm text-redis-dusk-30">{formatTime(activity.timestamp)}</time>
  </header>

  <div class="px-4 py-3">
    {#each [...groupedArticles.entries()] as [source, articles]}
      <details class="group">
        <summary class="flex items-center gap-2 cursor-pointer py-1 text-redis-sky-blue hover:text-white list-none">
          <i class="fa-solid fa-chevron-right text-xs transition-transform group-open:rotate-90"></i>
          <span>{source}</span>
          <span class="text-redis-dusk-50">({articles.length})</span>
        </summary>
        <div class="ml-4 border-l border-redis-dusk-70 pl-3">
          {#each articles as article}
            <details class="group/article">
              <summary
                class="flex items-center gap-2 cursor-pointer py-1 text-redis-dusk-30 hover:text-white list-none"
              >
                <i class="fa-solid fa-chevron-right text-xs transition-transform group-open/article:rotate-90"></i>
                <span class="truncate">{article.title}</span>
              </summary>
              <div class="ml-4 py-2 text-sm space-y-2">
                <p class="text-white">{article.summary}</p>
                {#if article.topics.length > 0}
                  <div class="flex flex-wrap gap-1">
                    {#each article.topics as topic}
                      <span class="px-2 py-0.5 bg-redis-midnight rounded text-xs text-redis-yellow">{topic}</span>
                    {/each}
                  </div>
                {/if}
                {#if article.namedEntities.people.length > 0}
                  <p class="text-redis-dusk-30">
                    <span class="text-redis-violet">People:</span>
                    {article.namedEntities.people.join(', ')}
                  </p>
                {/if}
                {#if article.namedEntities.organizations.length > 0}
                  <p class="text-redis-dusk-30">
                    <span class="text-redis-violet">Organizations:</span>
                    {article.namedEntities.organizations.join(', ')}
                  </p>
                {/if}
                {#if article.namedEntities.locations.length > 0}
                  <p class="text-redis-dusk-30">
                    <span class="text-redis-violet">Locations:</span>
                    {article.namedEntities.locations.join(', ')}
                  </p>
                {/if}
              </div>
            </details>
          {/each}
        </div>
      </details>
    {/each}
  </div>
</article>

