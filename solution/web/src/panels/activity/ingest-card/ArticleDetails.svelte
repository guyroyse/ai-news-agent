<script lang="ts">
  import type { ArticleSummary as ArticleSummaryType } from '@services/api-service'
  import ArticleSummary from './ArticleSummary.svelte'
  import ArticleTopics from './ArticleTopics.svelte'
  import ArticleNamedEntities from './ArticleNamedEntities.svelte'

  type Props = {
    article: ArticleSummaryType
  }

  let { article }: Props = $props()
</script>

<details class="group/article">
  <summary class="flex items-center gap-2 cursor-pointer py-1 text-redis-dusk-30 hover:text-white list-none">
    <i class="fa-solid fa-chevron-right text-xs transition-transform group-open/article:rotate-90"></i>
    <span class="truncate">{article.title}</span>
  </summary>
  <div class="ml-4 py-2 text-sm space-y-2">
    <ArticleSummary summary={article.summary} />
    <ArticleTopics topics={article.topics} />
    <ArticleNamedEntities label="People" entities={article.namedEntities.people} />
    <ArticleNamedEntities label="Organizations" entities={article.namedEntities.organizations} />
    <ArticleNamedEntities label="Locations" entities={article.namedEntities.locations} />
  </div>
</details>
